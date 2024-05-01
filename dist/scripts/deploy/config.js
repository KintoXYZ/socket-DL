"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrides = exports.executorAddresses = exports.watcherAddresses = exports.transmitterAddresses = exports.msgValueMaxThreshold = exports.type = exports.gasPrice = exports.gasLimit = exports.initialPacketCount = exports.maxPacketLength = exports.capacitorType = exports.filterSiblingChains = exports.filterChains = exports.newRoleStatus = exports.sendTransaction = exports.executionManagerVersion = exports.chains = exports.socketOwner = exports.mode = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const src_1 = require("../../src");
const ethers_1 = require("ethers");
const chainConfig_json_1 = __importDefault(require("../../chainConfig.json"));
exports.mode = process.env.DEPLOYMENT_MODE;
if (!process.env.SOCKET_OWNER_ADDRESS)
    throw Error("Socket owner address not present");
exports.socketOwner = process.env.SOCKET_OWNER_ADDRESS;
console.log("================================================================================================================");
console.log("");
console.log(`Mode: ${exports.mode}`);
console.log(`Version: ${src_1.version[exports.mode]}`);
console.log(`Owner: ${exports.socketOwner}`);
console.log("");
console.log(`Make sure ${exports.mode}_addresses.json and ${exports.mode}_verification.json is cleared for given networks if redeploying!!`);
console.log("");
console.log("================================================================================================================");
exports.chains = [
    // ChainSlug.GOERLI,
    src_1.ChainSlug.ARBITRUM_SEPOLIA,
    src_1.ChainSlug.OPTIMISM_SEPOLIA,
    src_1.ChainSlug.KINTO,
    src_1.ChainSlug.KINTO_DEVNET,
    // ChainSlug.POLYGON_MUMBAI,
    // ChainSlug.SX_NETWORK_TESTNET,
    // ChainSlug.SX_NETWORK,
    // ChainSlug.MODE_TESTNET,
    // ChainSlug.VICTION_TESTNET,
    // ChainSlug.BSC_TESTNET,
    // ChainSlug.AEVO_TESTNET,
    // ChainSlug.LYRA_TESTNET,
    // ChainSlug.SEPOLIA,
    // ChainSlug.XAI_TESTNET,
    // ChainSlug.CDK_TESTNET,
    // ChainSlug.AEVO,
    // ChainSlug.MAINNET,
    // ChainSlug.ARBITRUM,
    // ChainSlug.OPTIMISM,
    // ChainSlug.POLYGON_MAINNET,
    // ChainSlug.LYRA,
    // ChainSlug.BSC,
    // ChainSlug.BASE,
    // ChainSlug.MODE,
    // ChainSlug.ANCIENT8_TESTNET,
    // ChainSlug.ANCIENT8_TESTNET2,
    // ChainSlug.SYNDR_SEPOLIA_L3,
    // ChainSlug.HOOK_TESTNET,
    // ChainSlug.HOOK,
    // ChainSlug.PARALLEL,
    // ChainSlug.MANTLE,
    // ChainSlug.REYA_CRONOS,
    // ChainSlug.REYA,
    src_1.ChainSlug.POLYNOMIAL_TESTNET,
];
exports.executionManagerVersion = src_1.CORE_CONTRACTS.ExecutionManager;
exports.sendTransaction = true;
exports.newRoleStatus = true;
exports.filterChains = exports.chains;
exports.filterSiblingChains = exports.chains;
exports.capacitorType = 1;
exports.maxPacketLength = 1;
exports.initialPacketCount = 0;
exports.gasLimit = undefined;
exports.gasPrice = undefined;
exports.type = 0;
const MSG_VALUE_MAX_THRESHOLD = ethers_1.utils.parseEther("0.001");
const msgValueMaxThreshold = (chain) => {
    if (chainConfig_json_1.default[chain] && chainConfig_json_1.default[chain].msgValueMaxThreshold)
        return chainConfig_json_1.default[chain].msgValueMaxThreshold;
    return MSG_VALUE_MAX_THRESHOLD;
};
exports.msgValueMaxThreshold = msgValueMaxThreshold;
exports.transmitterAddresses = {
    [src_1.DeploymentMode.DEV]: "0x138e9840861C983DC0BB9b3e941FB7C0e9Ade320",
    [src_1.DeploymentMode.SURGE]: "0x22883bEF8302d50Ac76c6F6e048965Cd4413EBb7",
    [src_1.DeploymentMode.PROD]: "0xfbc5ea2525bb827979e4c33b237cd47bcb8f81c5",
};
exports.watcherAddresses = {
    [src_1.DeploymentMode.DEV]: "0xBe6fC90D42bED21d722D5698aF2916C3a3b1393D",
    [src_1.DeploymentMode.SURGE]: "0xD7Ab0e4c8c31A91fb26552F7Ad3E91E169B86225",
    [src_1.DeploymentMode.PROD]: "0x75ddddf61b8180d3837b7d8b98c062ca442e0e14", // prod
    // [DeploymentMode.PROD]: "0x55296741c6d72a07f3965abab04737c29016f2eb", // aevo watcher
    // [DeploymentMode.PROD]: "0xA3a585c6d59CCE6aAe7035e8df48b3327cC8BE54", // sx testnet watcher 1
    // [DeploymentMode.PROD]: "0x7EFF16a34e3433182D636488bc97919b10283F37", // sx testnet watcher 2
    // [DeploymentMode.PROD]: "0x8fB53330b1AEa01f6d34faff90e0B7c2797FC3aD", // sx watcher 1
    // [DeploymentMode.PROD]: "0xE8D6b3eE50887c131D64065a97CCC786dF0bA336", // sx watcher 2
    // [DeploymentMode.PROD]: "0x3b9FF70BcdF0B459A92fce1AbE5A6A713261BA75", // sx watcher 3
    // [DeploymentMode.PROD]: "0x5Ca565e0952C44DBF1986988ba4d10A171D45FB9", // sx watcher 4
};
exports.executorAddresses = {
    // [DeploymentMode.DEV]: "0x8e90345042b2720F33138CC437f8f897AC84A095", // private key
    [src_1.DeploymentMode.DEV]: "0x5ea69806b1df5dbdc6c1a78c662682ca48f9524d",
    [src_1.DeploymentMode.SURGE]: "0x3051Aa7F267bF425A4e8bF766750D60391F014B4",
    [src_1.DeploymentMode.PROD]: "0x42639d8fd154b72472e149a7d5ac13fa280303d9",
};
const overrides = (chain) => {
    if (chain == src_1.ChainSlug.ARBITRUM) {
        return {
            type: exports.type,
            gasLimit: 200000000,
            gasPrice: exports.gasPrice,
        };
    }
    else if (chain == src_1.ChainSlug.ARBITRUM_SEPOLIA) {
        return {
            type: 1,
            gasLimit: 50000000,
            gasPrice: 1867830000,
        };
    }
    else if (chain == src_1.ChainSlug.OPTIMISM) {
        return {
            type: exports.type,
            gasLimit: 4000000,
            gasPrice: exports.gasPrice,
        };
    }
    else if (chain == src_1.ChainSlug.BASE) {
        return {
            type: exports.type,
            gasLimit: 2000000,
            gasPrice: 2000000000,
        };
    }
    else if (chain == src_1.ChainSlug.OPTIMISM_SEPOLIA) {
        return {
            type: 1,
            gasLimit: 5000000,
            gasPrice: 4000000000,
        };
    }
    else if (chain == src_1.ChainSlug.BSC) {
        return {
            type: exports.type,
            gasLimit: 3000000,
            gasPrice: exports.gasPrice,
        };
    }
    else if (chain == src_1.ChainSlug.BSC_TESTNET) {
        return {
            type: exports.type,
            gasLimit: exports.gasLimit,
            gasPrice: exports.gasPrice,
        };
    }
    else if (chain == src_1.ChainSlug.MAINNET) {
        return {
            // type: 1,
            gasLimit: 4000000,
            gasPrice: 40000000000,
        };
    }
    else if (chain == src_1.ChainSlug.GOERLI) {
        return {
            type: exports.type,
            gasLimit: 3000000,
            gasPrice: exports.gasPrice,
        };
    }
    else if (chain == src_1.ChainSlug.POLYGON_MAINNET) {
        return {
            type: exports.type,
            gasLimit: exports.gasLimit,
            gasPrice: 200000000000,
        };
    }
    else if (chain == src_1.ChainSlug.POLYGON_MUMBAI) {
        return {
            type: 1,
            gasLimit: 3000000,
            gasPrice: 10000000000,
        };
    }
    else if (chain == src_1.ChainSlug.SEPOLIA) {
        return {
            type: exports.type,
            gasLimit: 2000000,
            gasPrice: 250000000000,
        };
    }
    else if (chain == src_1.ChainSlug.AEVO_TESTNET) {
        return {
            type: 2,
            // gasLimit,
            // gasPrice,
        };
    }
    else if (chain == src_1.ChainSlug.AEVO) {
        return {
            type: 1,
            // gasLimit,
            gasPrice: 100000000,
        };
    }
    else if (chain == src_1.ChainSlug.LYRA_TESTNET) {
        return {
            type: 2,
            // gasLimit,
            // gasPrice: 100_000_000,
        };
    }
    else if (chain == src_1.ChainSlug.LYRA) {
        return {
        // type: 1,
        // gasLimit,
        // gasPrice: 100_000_000,
        };
    }
    else if (chain == src_1.ChainSlug.XAI_TESTNET) {
        return {
        // type: 1,
        // gasLimit,
        // gasPrice: 100_000_000,
        };
    }
    else if (chain == src_1.ChainSlug.SX_NETWORK_TESTNET) {
        return {
        // type: 1,
        // gasLimit,
        // gasPrice: 100_000_000,
        };
    }
    else if (chain == src_1.ChainSlug.MODE_TESTNET) {
        return {
            type: 1,
            // gasLimit,
            gasPrice: 100000000,
        };
    }
    else if (chain == src_1.ChainSlug.SYNDR_SEPOLIA_L3) {
        return {
            type: 1,
            gasLimit: 500000000,
            gasPrice: 1000000,
        };
    }
    else if (chain == src_1.ChainSlug.VICTION_TESTNET) {
        return {
        // type: 1,
        // gasLimit,
        // gasPrice: 100_000_000,
        };
    }
    else if (chain == src_1.ChainSlug.HOOK) {
        return {
            // type: 1,
            gasLimit: 3000000,
            // gasPrice: 100000000,
        };
    }
    else if (chain == src_1.ChainSlug.REYA_CRONOS) {
        return {
            type: 1,
            // gasLimit: 200000,
            gasPrice: 0,
        };
    }
    else if (chain == src_1.ChainSlug.REYA) {
        return {
            type: 1,
            // gasLimit: 20000000,
            gasPrice: 0,
        };
    }
    else if (chain == src_1.ChainSlug.POLYNOMIAL_TESTNET) {
        return {
            type: exports.type,
            gasLimit: 4000000,
            gasPrice: exports.gasPrice,
        };
    }
    else if (chain == src_1.ChainSlug.KINTO) {
        return {
            type: exports.type,
            gasLimit: 4000000,
            gasPrice: exports.gasPrice,
        };
    }
    else if (chain == src_1.ChainSlug.KINTO_DEVNET) {
        return {
            type: exports.type,
            gasLimit: 4000000,
            gasPrice: exports.gasPrice,
        };
    }
    else if (chainConfig_json_1.default[chain] && chainConfig_json_1.default[chain].overrides) {
        return chainConfig_json_1.default[chain].overrides;
    }
    else
        return { type: exports.type, gasLimit: exports.gasLimit, gasPrice: exports.gasPrice };
};
exports.overrides = overrides;
