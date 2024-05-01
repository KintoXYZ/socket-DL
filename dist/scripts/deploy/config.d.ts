import { ChainSlug, DeploymentMode, CORE_CONTRACTS } from "../../src";
import { BigNumberish } from "ethers";
export declare const mode: DeploymentMode;
export declare const socketOwner: string;
export declare const chains: Array<ChainSlug>;
export declare const executionManagerVersion = CORE_CONTRACTS.ExecutionManager;
export declare const sendTransaction = true;
export declare const newRoleStatus = true;
export declare const filterChains: number[];
export declare const filterSiblingChains: number[];
export declare const capacitorType = 1;
export declare const maxPacketLength = 1;
export declare const initialPacketCount = 0;
export declare const gasLimit: any;
export declare const gasPrice: any;
export declare const type = 0;
export declare const msgValueMaxThreshold: (chain: ChainSlug) => BigNumberish;
export declare const transmitterAddresses: {
    dev: string;
    surge: string;
    prod: string;
};
export declare const watcherAddresses: {
    dev: string;
    surge: string;
    prod: string;
};
export declare const executorAddresses: {
    dev: string;
    surge: string;
    prod: string;
};
export declare const overrides: (chain: ChainSlug | number) => {
    type?: number | undefined;
    gasLimit?: BigNumberish | undefined;
    gasPrice?: BigNumberish | undefined;
};
