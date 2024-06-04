import { ethers, Signer } from "ethers";
declare class TrezorSigner extends Signer {
    provider: ethers.providers.Provider;
    constructor(provider: ethers.providers.Provider);
    getAddress(): Promise<string>;
    signMessage(message: string): Promise<string>;
    signTransaction(transaction: ethers.providers.TransactionRequest): Promise<string>;
    connect(provider: ethers.providers.Provider): Signer;
}
export default TrezorSigner;
