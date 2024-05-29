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
declare const deployOnKinto: (kintoWalletAddr: Address, contractName: string, args: Array<string>, privateKeys: string[]) => Promise<Contract>;
declare const isKinto: (chainId: number) => boolean;
declare const handleOps: (kintoWalletAddr: Address, userOps: PopulatedTransaction[] | UserOperation[], privateKeys: string[], value?: BigNumber, gasParams?: GasParams, withPaymaster?: boolean) => Promise<TransactionReceipt>;
declare const whitelistApp: (kintoWalletAddr: Address, app: Address, privateKeys: string[]) => Promise<TransactionReceipt>;
declare const setFunderWhitelist: (kintoWalletAddr: Address, funders: Address[], isWhitelisted: boolean[], signer: SignerWithAddress | Wallet, privateKeys: string[]) => Promise<TransactionReceipt>;
declare const estimateGas: (signer: Signer, entryPoint: Contract, userOps: UserOperation[]) => Promise<GasParams>;
export declare const getInstance: (contractName: string, address: Address) => Promise<Contract>;
export { isKinto, setFunderWhitelist, handleOps, deployOnKinto, whitelistApp, estimateGas, };
