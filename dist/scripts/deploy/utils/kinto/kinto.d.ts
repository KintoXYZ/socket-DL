import { Wallet, Contract, BigNumber, PopulatedTransaction, Signer } from "ethers";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { Address } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
type UserOperation = {
    sender: Address;
    nonce: BigNumber;
    initCode: string;
    callData: string;
    callGasLimit: number;
    verificationGasLimit: number;
    preVerificationGas: number;
    maxFeePerGas: BigNumber;
    maxPriorityFeePerGas: BigNumber;
    paymasterAndData: string;
    signature: string;
};
type GasParams = {
    gasLimit?: BigNumber;
    maxFeePerGas?: BigNumber;
    maxPriorityFeePerGas?: BigNumber;
};
declare const deployOnKinto: (contractName: string, args: Array<string>, signer: SignerWithAddress | Wallet) => Promise<Contract>;
declare const isKinto: (chainId: number) => boolean;
declare const handleOps: (userOps: PopulatedTransaction[] | UserOperation[], signer: Signer | Wallet, gasParams?: GasParams, withPaymaster?: boolean) => Promise<TransactionReceipt>;
declare const whitelistApp: (app: Address, signer: SignerWithAddress | Wallet) => Promise<TransactionReceipt>;
declare const estimateGas: (signer: Signer, entryPoint: Contract, userOps: UserOperation[]) => Promise<GasParams>;
export { isKinto, handleOps, deployOnKinto, whitelistApp, estimateGas };
