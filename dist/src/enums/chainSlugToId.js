"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainSlugToId = void 0;
const chainId_1 = require("./chainId");
const chainSlug_1 = require("./chainSlug");
exports.ChainSlugToId = {
    [chainSlug_1.ChainSlug.ARBITRUM]: chainId_1.ChainId.ARBITRUM,
    [chainSlug_1.ChainSlug.ARBITRUM_GOERLI]: chainId_1.ChainId.ARBITRUM_GOERLI,
    [chainSlug_1.ChainSlug.ARBITRUM_SEPOLIA]: chainId_1.ChainId.ARBITRUM_SEPOLIA,
    [chainSlug_1.ChainSlug.OPTIMISM]: chainId_1.ChainId.OPTIMISM,
    [chainSlug_1.ChainSlug.OPTIMISM_GOERLI]: chainId_1.ChainId.OPTIMISM_GOERLI,
    [chainSlug_1.ChainSlug.OPTIMISM_SEPOLIA]: chainId_1.ChainId.OPTIMISM_SEPOLIA,
    [chainSlug_1.ChainSlug.BSC]: chainId_1.ChainId.BSC,
    [chainSlug_1.ChainSlug.BSC_TESTNET]: chainId_1.ChainId.BSC_TESTNET,
    [chainSlug_1.ChainSlug.MAINNET]: chainId_1.ChainId.MAINNET,
    [chainSlug_1.ChainSlug.GOERLI]: chainId_1.ChainId.GOERLI,
    [chainSlug_1.ChainSlug.SEPOLIA]: chainId_1.ChainId.SEPOLIA,
    [chainSlug_1.ChainSlug.POLYGON_MAINNET]: chainId_1.ChainId.POLYGON_MAINNET,
    [chainSlug_1.ChainSlug.POLYGON_MUMBAI]: chainId_1.ChainId.POLYGON_MUMBAI,
    [chainSlug_1.ChainSlug.AEVO_TESTNET]: chainId_1.ChainId.AEVO_TESTNET,
    [chainSlug_1.ChainSlug.AEVO]: chainId_1.ChainId.AEVO,
    [chainSlug_1.ChainSlug.HARDHAT]: chainId_1.ChainId.HARDHAT,
    [chainSlug_1.ChainSlug.AVALANCHE]: chainId_1.ChainId.AVALANCHE,
    [chainSlug_1.ChainSlug.LYRA_TESTNET]: chainId_1.ChainId.LYRA_TESTNET,
    [chainSlug_1.ChainSlug.LYRA]: chainId_1.ChainId.LYRA,
    [chainSlug_1.ChainSlug.XAI_TESTNET]: chainId_1.ChainId.XAI_TESTNET,
    [chainSlug_1.ChainSlug.SX_NETWORK_TESTNET]: chainId_1.ChainId.SX_NETWORK_TESTNET,
    [chainSlug_1.ChainSlug.SX_NETWORK]: chainId_1.ChainId.SX_NETWORK,
    [chainSlug_1.ChainSlug.MODE_TESTNET]: chainId_1.ChainId.MODE_TESTNET,
    [chainSlug_1.ChainSlug.VICTION_TESTNET]: chainId_1.ChainId.VICTION_TESTNET,
    [chainSlug_1.ChainSlug.CDK_TESTNET]: chainId_1.ChainId.CDK_TESTNET,
    [chainSlug_1.ChainSlug.BASE]: chainId_1.ChainId.BASE,
    [chainSlug_1.ChainSlug.MODE]: chainId_1.ChainId.MODE,
    [chainSlug_1.ChainSlug.ANCIENT8_TESTNET]: chainId_1.ChainId.ANCIENT8_TESTNET,
    [chainSlug_1.ChainSlug.ANCIENT8_TESTNET2]: chainId_1.ChainId.ANCIENT8_TESTNET2,
    [chainSlug_1.ChainSlug.HOOK_TESTNET]: chainId_1.ChainId.HOOK_TESTNET,
    [chainSlug_1.ChainSlug.HOOK]: chainId_1.ChainId.HOOK,
    [chainSlug_1.ChainSlug.PARALLEL]: chainId_1.ChainId.PARALLEL,
    [chainSlug_1.ChainSlug.MANTLE]: chainId_1.ChainId.MANTLE,
    [chainSlug_1.ChainSlug.REYA_CRONOS]: chainId_1.ChainId.REYA_CRONOS,
    [chainSlug_1.ChainSlug.REYA]: chainId_1.ChainId.REYA,
    [chainSlug_1.ChainSlug.SYNDR_SEPOLIA_L3]: chainId_1.ChainId.SYNDR_SEPOLIA_L3,
    [chainSlug_1.ChainSlug.POLYNOMIAL_TESTNET]: chainId_1.ChainId.POLYNOMIAL_TESTNET,
    [chainSlug_1.ChainSlug.KINTO]: chainId_1.ChainId.KINTO,
    [chainSlug_1.ChainSlug.KINTO_DEVNET]: chainId_1.ChainId.KINTO_DEVNET,
};
