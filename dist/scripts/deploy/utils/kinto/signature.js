"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = exports.signUserOp = exports.getKintoProvider = void 0;
const hardhat_1 = require("hardhat");
const utils_1 = require("ethers/lib/utils");
const constants_json_1 = require("./constants.json");
const trezorProvider_1 = __importDefault(require("./trezorProvider"));
const signer_ledger_1 = require("@ethers-ext/signer-ledger");
const hw_transport_node_hid_1 = __importDefault(require("@ledgerhq/hw-transport-node-hid"));
const packUserOpForSig = (userOp) => {
    return utils_1.defaultAbiCoder.encode([
        "address",
        "uint256",
        "bytes32",
        "bytes32",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "bytes32",
    ], [
        userOp.sender,
        userOp.nonce,
        (0, utils_1.keccak256)(userOp.initCode),
        (0, utils_1.keccak256)(userOp.callData),
        userOp.callGasLimit,
        userOp.verificationGasLimit,
        userOp.preVerificationGas,
        userOp.maxFeePerGas,
        userOp.maxPriorityFeePerGas,
        (0, utils_1.keccak256)(userOp.paymasterAndData),
    ]);
};
const getUserOpHash = async (userOp, entryPointAddress, chainId) => {
    const packedForSig = packUserOpForSig(userOp);
    const opHash = (0, utils_1.keccak256)(packedForSig);
    return (0, utils_1.keccak256)(utils_1.defaultAbiCoder.encode(["bytes32", "address", "uint256"], [opHash, entryPointAddress, chainId]));
};
const signUserOp = async (kintoWalletAddr, userOp, entryPointAddress, chainId, privateKeys) => {
    const provider = getKintoProvider();
    const kintoWallet = new hardhat_1.ethers.Contract(kintoWalletAddr, constants_json_1.KINTO_DATA.contracts.kintoWallet.abi, provider);
    // prepare hash to sign
    const hash = await getUserOpHash(userOp, entryPointAddress, chainId);
    const ethSignedHash = (0, utils_1.hashMessage)((0, utils_1.arrayify)(hash));
    // check policy and required signers
    const policy = await kintoWallet.signerPolicy();
    const ownersLength = await kintoWallet.getOwnersCount();
    const requiredSigners = policy == 3 ? ownersLength : policy == 1 ? 1 : ownersLength - 1;
    const keysLength = ["TREZOR", "LEDGER"].includes(process.env.HW_TYPE)
        ? privateKeys.length + 1
        : privateKeys.length + 0;
    if (keysLength < requiredSigners) {
        console.error(`Not enough private keys provided. Required ${requiredSigners}, got ${privateKeys.length}`);
        return;
    }
    let signature = "0x";
    for (const privateKey of privateKeys) {
        if (privateKey == constants_json_1.TREZOR || privateKey == constants_json_1.LEDGER) {
            // sign with hardware wallet if available
            const hwSignature = await signWithHw(hash, privateKey);
            console.log("HW Signature:", hwSignature);
            signature += hwSignature.slice(2);
        }
        else {
            const signingKey = new utils_1.SigningKey(privateKey);
            const sig = signingKey.signDigest(ethSignedHash);
            signature += (0, utils_1.joinSignature)(sig).slice(2); // remove initial '0x'
        }
    }
    return signature;
};
exports.signUserOp = signUserOp;
const signWithHw = async (hash, hwType) => {
    const provider = getKintoProvider();
    if (hwType === constants_json_1.TREZOR) {
        try {
            console.log("\nUsing Trezor as second signer...");
            const trezorSigner = new trezorProvider_1.default(provider);
            const signer = await trezorSigner.getAddress();
            console.log("- Signing with", signer);
            return await trezorSigner.signMessage(hash);
        }
        catch (e) {
            console.error("- Could not sign with Trezor", e);
        }
    }
    if (hwType === constants_json_1.LEDGER) {
        try {
            console.log("\nUsing Ledger as second signer...");
            // @ts-ignore
            const ledger = new signer_ledger_1.LedgerSigner(hw_transport_node_hid_1.default, provider);
            const signer = await ledger.getAddress();
            console.log("- Signing with", signer);
            return await ledger.signMessage(hash);
        }
        catch (e) {
            console.error("- Could not sign with Ledger", e);
        }
    }
    console.log("\nWARNING: No hardware wallet detected. To use one, set HW_TYPE env variable to LEDGER or TREZOR.");
};
const sign = async (privateKey, chainId) => {
    const wallet = new hardhat_1.ethers.Wallet(privateKey, getKintoProvider());
    const kintoID = new hardhat_1.ethers.Contract(constants_json_1.KINTO_DATA.contracts.kintoID.address, constants_json_1.KINTO_DATA.contracts.kintoID.abi, wallet);
    // const domainSeparator = await kintoID.domainSeparator();
    const domain = {
        name: "KintoID",
        version: "1",
        chainId,
        verifyingContract: constants_json_1.KINTO_DATA.contracts.kintoID.address,
    };
    const types = {
        SignatureData: [
            { name: "signer", type: "address" },
            { name: "nonce", type: "uint256" },
            { name: "expiresAt", type: "uint256" },
        ],
    };
    const value = {
        signer: wallet.address,
        nonce: await kintoID.nonces(wallet.address),
        expiresAt: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours expiry
    };
    const signature = await wallet._signTypedData(domain, types, value);
    console.log("Signature results:", {
        value,
        signature,
    });
    return signature;
};
exports.sign = sign;
const getKintoProvider = () => {
    return new hardhat_1.ethers.providers.StaticJsonRpcProvider(constants_json_1.KINTO_DATA.rpcUrl);
};
exports.getKintoProvider = getKintoProvider;
