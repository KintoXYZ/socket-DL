"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const connect_1 = __importStar(require("@trezor/connect"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class TrezorSigner extends ethers_1.Signer {
    constructor(provider) {
        super();
        this.provider = provider;
        connect_1.default.init({
            popup: false,
            debug: false,
            manifest: {
                email: "support@kinto.xyz",
                appUrl: "kinto.xyz",
            },
            // transports: ['BridgeTransport'],
        })
            .then(() => {
            // console.log("Trezor is ready!");
        })
            .catch((error) => {
            console.log(error.message);
        });
        connect_1.default.on(connect_1.TRANSPORT_EVENT, (event) => {
            if (event.type === connect_1.TRANSPORT.ERROR) {
                console.log("Transport is missing");
            }
            if (event.type === connect_1.TRANSPORT.START) {
                // console.log(event);
            }
        });
        connect_1.default.on(connect_1.DEVICE_EVENT, (event) => {
            if (event.type === connect_1.DEVICE.CONNECT_UNACQUIRED) {
                // connected device is unknown or busy
                // most common reasons is that either device is currently used somewhere else
                // or app refreshed during call and trezor-bridge didn't managed to release the session
                // render "Acquire device" button and after click try to fetch device features using:
                // TrezorConnect.getFeatures();
                console.log("Connected device is unknown or busy...");
            }
        });
        connect_1.default.on(connect_1.UI_EVENT, (event) => {
            if (event.type === connect_1.UI.REQUEST_PIN) {
                // FIXME: not sure what's the positions of the PIN on the screen, grid is 3x3 and the positions are 1-9
                // 1st position is top left, 9th position is bottom right
                const prompt = (0, prompt_sync_1.default)({});
                const positions = prompt.hide("Enter your the positions of your PIN number:");
                connect_1.default.uiResponse({ type: connect_1.UI.RECEIVE_PIN, payload: positions });
            }
            if (event.type === connect_1.UI.REQUEST_PASSPHRASE) {
                if (event.payload.device.features.capabilities.includes("Capability_PassphraseEntry")) {
                    const prompt = (0, prompt_sync_1.default)({});
                    const passphrase = prompt.hide("Enter your passphrase: (empty for default)");
                    connect_1.default.uiResponse({
                        type: connect_1.UI.RECEIVE_PASSPHRASE,
                        payload: { passphraseOnDevice: true, value: passphrase },
                    });
                }
                else {
                    const prompt = (0, prompt_sync_1.default)({});
                    const passphrase = prompt.hide("Enter your passphrase: (empty for default)");
                    connect_1.default.uiResponse({
                        type: connect_1.UI.RECEIVE_PASSPHRASE,
                        payload: { value: passphrase, save: true },
                    });
                }
            }
            if (event.type === connect_1.UI.SELECT_DEVICE) {
                if (event.payload.devices.length > 0) {
                    // more then one device connected
                    // example how to respond to select device
                    connect_1.default.uiResponse({
                        type: connect_1.UI_RESPONSE.RECEIVE_DEVICE,
                        payload: {
                            device: event.payload.devices[0],
                        },
                    });
                }
                else {
                    // no devices connected, waiting for connection
                    console.log("\nATTENTION: No devices connected. Open Trezor Suite, connect your device and unlock your account.");
                }
            }
            if (event.type === connect_1.UI.REQUEST_CONFIRMATION) {
                // payload: true - user decides to continue anyway
                connect_1.default.uiResponse({
                    type: connect_1.UI.RECEIVE_CONFIRMATION,
                    payload: false,
                });
            }
        });
    }
    async getAddress() {
        const response = await connect_1.default.ethereumGetAddress({
            path: "m/44'/60'/0'/0/0",
            showOnTrezor: false,
        });
        if (response.success) {
            return response.payload.address;
        }
        else {
            throw new Error(`Failed to get address from Trezor: ${JSON.stringify(response.payload)}`);
        }
    }
    async signMessage(message) {
        const response = await connect_1.default.ethereumSignMessage({
            path: "m/44'/60'/0'/0/0",
            message: ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.toUtf8Bytes(message)),
        });
        if (response.success) {
            return response.payload.signature;
        }
        else {
            throw new Error(`Failed to sign message with Trezor: ${JSON.stringify(response.payload)}`);
        }
    }
    async signTransaction(transaction) {
        const tx = await ethers_1.ethers.utils.resolveProperties(transaction);
        const response = await connect_1.default.ethereumSignTransaction({
            path: "m/44'/60'/0'/0/0",
            transaction: {
                to: tx.to,
                value: ethers_1.ethers.utils.hexlify(tx.value),
                gasPrice: ethers_1.ethers.utils.hexlify(tx.gasPrice),
                gasLimit: ethers_1.ethers.utils.hexlify(tx.gasLimit),
                nonce: ethers_1.ethers.utils.hexlify(tx.nonce),
                data: tx.data ? ethers_1.ethers.utils.hexlify(tx.data) : "0x",
                chainId: tx.chainId,
            },
        });
        if (response.success) {
            // @ts-ignore
            return ethers_1.ethers.utils.serializeTransaction(tx, {
                v: response.payload.v,
                r: response.payload.r,
                s: response.payload.s,
            });
        }
        else {
            throw new Error(`Failed to sign transaction with Trezor: ${JSON.stringify(response.payload)}`);
        }
    }
    connect(provider) {
        return new TrezorSigner(provider);
    }
}
exports.default = TrezorSigner;
