export declare const KINTO_DATA: {
    chainId: number;
    contracts: {
        kintoID: {
            address: string;
            abi: string[];
        };
        kintoWallet: {
            abi: string[];
        };
        factory: {
            address: string;
            abi: string[];
        };
        entryPoint: {
            address: string;
            abi: string[];
        };
        paymaster: {
            address: string;
            abi: string[];
        };
        deployer: {
            address: string;
            abi: string[];
        };
    };
    gasParams: {
        callGasLimit: number;
        verificationGasLimit: number;
        preVerificationGas: number;
    };
};
