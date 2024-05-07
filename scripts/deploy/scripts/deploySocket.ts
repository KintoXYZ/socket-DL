import { Contract, Wallet, constants } from "ethers";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import {
  DeployParams,
  getInstance,
  getOrDeploy,
  storeAddresses,
} from "../utils";

import {
  CORE_CONTRACTS,
  ChainSocketAddresses,
  DeploymentMode,
  version,
} from "../../../src";
import deploySwitchboards from "./deploySwitchboard";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { socketOwner, executionManagerVersion, overrides } from "../config";
import { maxAllowedPacketLength } from "../../constants";
import { extractArgTypes, handleOps, isKinto } from "../utils/kinto/kinto";
import { BytesLike, defaultAbiCoder, getCreate2Address, keccak256 } from "ethers/lib/utils";
import { ethers } from "hardhat";

let allDeployed = false;

export interface ReturnObj {
  allDeployed: boolean;
  deployedAddresses: ChainSocketAddresses;
}

/**
 * Deploys network-independent socket contracts
 */
export const deploySocket = async (
  socketSigner: SignerWithAddress | Wallet,
  chainSlug: number,
  currentMode: DeploymentMode,
  deployedAddresses: ChainSocketAddresses
): Promise<ReturnObj> => {
  const dryRun = process.env.DRY_RUN === "true";
  if (dryRun) console.log("\n***** Dry run mode enabled *****");
  console.log("\nDeploying socket contracts on chain", chainSlug);
  const deployUtils: DeployParams = {
    addresses: deployedAddresses,
    mode: currentMode,
    signer: socketSigner,
    currentChainSlug: chainSlug,
  };

  try {
    const signatureVerifier: Contract = await getOrDeploy(
      CORE_CONTRACTS.SignatureVerifier,
      "contracts/utils/SignatureVerifier.sol",
      [socketOwner],
      deployUtils
    );
    deployUtils.addresses[CORE_CONTRACTS.SignatureVerifier] =
      signatureVerifier.address;

    const hasher: Contract = await getOrDeploy(
      CORE_CONTRACTS.Hasher,
      "contracts/utils/Hasher.sol",
      [socketOwner],
      deployUtils
    );
    deployUtils.addresses[CORE_CONTRACTS.Hasher] = hasher.address;

    const capacitorFactory: Contract = await getOrDeploy(
      CORE_CONTRACTS.CapacitorFactory,
      "contracts/CapacitorFactory.sol",
      [socketOwner, maxAllowedPacketLength],
      deployUtils
    );
    deployUtils.addresses[CORE_CONTRACTS.CapacitorFactory] =
      capacitorFactory.address;

    const socket: Contract = await getOrDeploy(
      CORE_CONTRACTS.Socket,
      "contracts/socket/Socket.sol",
      [
        chainSlug,
        hasher.address,
        capacitorFactory.address,
        socketOwner,
        version[deployUtils.mode],
      ],
      deployUtils
    );
    deployUtils.addresses[CORE_CONTRACTS.Socket] = socket.address;

    const executionManager: Contract = await getOrDeploy(
      executionManagerVersion,
      `contracts/${executionManagerVersion}.sol`,
      [socketOwner, chainSlug, socket.address, signatureVerifier.address],
      deployUtils
    );
    deployUtils.addresses[executionManagerVersion] = executionManager.address;

    const transmitManager: Contract = await getOrDeploy(
      CORE_CONTRACTS.TransmitManager,
      "contracts/TransmitManager.sol",
      [socketOwner, chainSlug, socket.address, signatureVerifier.address],
      deployUtils
    );
    deployUtils.addresses[CORE_CONTRACTS.TransmitManager] =
      transmitManager.address;

    // switchboards deploy
    deployUtils.addresses = await deploySwitchboards(
      chainSlug,
      socketOwner,
      socketSigner,
      deployUtils.addresses,
      currentMode
    );

    const socketBatcher: Contract = await getOrDeploy(
      "SocketBatcher",
      "contracts/socket/SocketBatcher.sol",
      [socketOwner],
      deployUtils
    );
    deployUtils.addresses["SocketBatcher"] = socketBatcher.address;

    // plug deployments
    const counter: Contract = await getOrDeploy(
      "Counter",
      "contracts/examples/Counter.sol",
      [socket.address],
      deployUtils
    );
    deployUtils.addresses["Counter"] = counter.address;

    // simulators
    const socketSimulator: Contract = await getOrDeploy(
      "SocketSimulator",
      "contracts/mocks/fee-updater/SocketSimulator.sol",
      [
        chainSlug,
        chainSlug,
        hasher.address,
        signatureVerifier.address,
        version[deployUtils.mode],
      ],
      deployUtils
    );
    deployUtils.addresses["SocketSimulator"] = socketSimulator.address;

    const simulatorUtils: Contract = await getOrDeploy(
      "SimulatorUtils",
      "contracts/mocks/fee-updater/SimulatorUtils.sol",
      [
        socketSimulator.address,
        signatureVerifier.address,
        socketOwner,
        chainSlug,
      ],
      deployUtils
    );
    deployUtils.addresses["SimulatorUtils"] = simulatorUtils.address;

    const switchboardSimulator: Contract = await getOrDeploy(
      "SwitchboardSimulator",
      "contracts/mocks/fee-updater/SwitchboardSimulator.sol",
      [
        socketOwner,
        socketSimulator.address,
        chainSlug,
        1000,
        signatureVerifier.address,
      ],
      deployUtils
    );
    deployUtils.addresses["SwitchboardSimulator"] =
      switchboardSimulator.address;

    // setup
    if (!dryRun) {
      const simulatorContract = (
        await getInstance("SocketSimulator", socketSimulator.address)
      ).connect(deployUtils.signer);
      let capacitor = await simulatorContract.capacitor();
      if (capacitor == constants.AddressZero) {
        let tx: TransactionReceipt;
        let txRequest = await simulatorContract.populateTransaction.setup(
          counter.address,
          switchboardSimulator.address,
          simulatorUtils.address,
          {
            ...overrides(chainSlug),
          }
        );
        if (isKinto(chainSlug)) {
          tx = await handleOps([txRequest], simulatorContract.signer);
        } else {
          tx = await (
            await simulatorContract.signer.sendTransaction(txRequest)
          ).wait();
        }
        deployUtils.addresses["CapacitorSimulator"] =
          await simulatorContract.capacitor();          
        console.log(tx.transactionHash, "setup for simulator");
      }
      
      deployUtils.addresses.startBlock = deployUtils.addresses.startBlock
        ? deployUtils.addresses.startBlock
        : await socketSigner.provider?.getBlockNumber();
    } else {
      const simulatorContract = (
        await getInstance("SocketSimulator", socketSimulator.address)
      ).connect(deployUtils.signer);
      const argTypes = await extractArgTypes("SingleCapacitor");
      const args = [socketSimulator.address, socketOwner];
      const encodedArgs = defaultAbiCoder.encode(argTypes, args);
      const bytecode = (await ethers.getContractFactory("SingleCapacitor")).bytecode;
      const bytecodeWithConstructor = bytecode + encodedArgs.substring(2); //remove the '0x' prefix
      const salt: BytesLike = ethers.utils.hexZeroPad('0x', 32); // or use random -> randomBytes(32);

      // deploy contract using Kinto's factory
      const create2Address = getCreate2Address(
        simulatorContract.address,
        salt,
        keccak256(bytecodeWithConstructor)
      );
      deployUtils.addresses["CapacitorSimulator"] = create2Address;
    }

    allDeployed = true;
    console.log(deployUtils.addresses);
    console.log("Contracts deployed!");
    
  } catch (error) {
    console.log("Error in deploying setup contracts", error);
  }

  await storeAddresses(
    deployUtils.addresses,
    deployUtils.currentChainSlug,
    deployUtils.mode
  );
  return {
    allDeployed,
    deployedAddresses: deployUtils.addresses,
  };
};
