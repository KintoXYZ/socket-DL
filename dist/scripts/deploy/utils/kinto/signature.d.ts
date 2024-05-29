import { Address } from "hardhat-deploy/dist/types";
declare const signUserOp: (kintoWalletAddr: Address, userOp: object, entryPointAddress: Address, chainId: number, privateKeys: string[]) => Promise<string>;
declare const sign: (privateKey: Address, chainId: number) => Promise<string>;
declare const getKintoProvider: () => import("@ethersproject/providers").StaticJsonRpcProvider;
export { getKintoProvider, signUserOp, sign };
