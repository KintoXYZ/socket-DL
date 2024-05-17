"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainSlugToKey = void 0;
const chainSlug_1 = require("./chainSlug");
const hardhatChainName_1 = require("./hardhatChainName");
exports.ChainSlugToKey = {
    [chainSlug_1.ChainSlug.ARBITRUM]: hardhatChainName_1.HardhatChainName.ARBITRUM,
    [chainSlug_1.ChainSlug.ARBITRUM_GOERLI]: hardhatChainName_1.HardhatChainName.ARBITRUM_GOERLI,
    [chainSlug_1.ChainSlug.ARBITRUM_SEPOLIA]: hardhatChainName_1.HardhatChainName.ARBITRUM_SEPOLIA,
    [chainSlug_1.ChainSlug.OPTIMISM]: hardhatChainName_1.HardhatChainName.OPTIMISM,
    [chainSlug_1.ChainSlug.OPTIMISM_GOERLI]: hardhatChainName_1.HardhatChainName.OPTIMISM_GOERLI,
    [chainSlug_1.ChainSlug.OPTIMISM_SEPOLIA]: hardhatChainName_1.HardhatChainName.OPTIMISM_SEPOLIA,
    [chainSlug_1.ChainSlug.BSC]: hardhatChainName_1.HardhatChainName.BSC,
    [chainSlug_1.ChainSlug.BSC_TESTNET]: hardhatChainName_1.HardhatChainName.BSC_TESTNET,
    [chainSlug_1.ChainSlug.MAINNET]: hardhatChainName_1.HardhatChainName.MAINNET,
    [chainSlug_1.ChainSlug.GOERLI]: hardhatChainName_1.HardhatChainName.GOERLI,
    [chainSlug_1.ChainSlug.SEPOLIA]: hardhatChainName_1.HardhatChainName.SEPOLIA,
    [chainSlug_1.ChainSlug.POLYGON_MAINNET]: hardhatChainName_1.HardhatChainName.POLYGON_MAINNET,
    [chainSlug_1.ChainSlug.POLYGON_MUMBAI]: hardhatChainName_1.HardhatChainName.POLYGON_MUMBAI,
    [chainSlug_1.ChainSlug.AEVO_TESTNET]: hardhatChainName_1.HardhatChainName.AEVO_TESTNET,
    [chainSlug_1.ChainSlug.AEVO]: hardhatChainName_1.HardhatChainName.AEVO,
    [chainSlug_1.ChainSlug.HARDHAT]: hardhatChainName_1.HardhatChainName.HARDHAT,
    [chainSlug_1.ChainSlug.AVALANCHE]: hardhatChainName_1.HardhatChainName.AVALANCHE,
    [chainSlug_1.ChainSlug.LYRA_TESTNET]: hardhatChainName_1.HardhatChainName.LYRA_TESTNET,
    [chainSlug_1.ChainSlug.LYRA]: hardhatChainName_1.HardhatChainName.LYRA,
    [chainSlug_1.ChainSlug.XAI_TESTNET]: hardhatChainName_1.HardhatChainName.XAI_TESTNET,
    [chainSlug_1.ChainSlug.SX_NETWORK_TESTNET]: hardhatChainName_1.HardhatChainName.SX_NETWORK_TESTNET,
    [chainSlug_1.ChainSlug.SX_NETWORK]: hardhatChainName_1.HardhatChainName.SX_NETWORK,
    [chainSlug_1.ChainSlug.MODE_TESTNET]: hardhatChainName_1.HardhatChainName.MODE_TESTNET,
    [chainSlug_1.ChainSlug.VICTION_TESTNET]: hardhatChainName_1.HardhatChainName.VICTION_TESTNET,
    [chainSlug_1.ChainSlug.CDK_TESTNET]: hardhatChainName_1.HardhatChainName.CDK_TESTNET,
    [chainSlug_1.ChainSlug.BASE]: hardhatChainName_1.HardhatChainName.BASE,
    [chainSlug_1.ChainSlug.MODE]: hardhatChainName_1.HardhatChainName.MODE,
    [chainSlug_1.ChainSlug.ANCIENT8_TESTNET]: hardhatChainName_1.HardhatChainName.ANCIENT8_TESTNET,
    [chainSlug_1.ChainSlug.ANCIENT8_TESTNET2]: hardhatChainName_1.HardhatChainName.ANCIENT8_TESTNET2,
    [chainSlug_1.ChainSlug.HOOK_TESTNET]: hardhatChainName_1.HardhatChainName.HOOK_TESTNET,
    [chainSlug_1.ChainSlug.HOOK]: hardhatChainName_1.HardhatChainName.HOOK,
    [chainSlug_1.ChainSlug.PARALLEL]: hardhatChainName_1.HardhatChainName.PARALLEL,
    [chainSlug_1.ChainSlug.MANTLE]: hardhatChainName_1.HardhatChainName.MANTLE,
    [chainSlug_1.ChainSlug.REYA_CRONOS]: hardhatChainName_1.HardhatChainName.REYA_CRONOS,
    [chainSlug_1.ChainSlug.REYA]: hardhatChainName_1.HardhatChainName.REYA,
    [chainSlug_1.ChainSlug.SYNDR_SEPOLIA_L3]: hardhatChainName_1.HardhatChainName.SYNDR_SEPOLIA_L3,
    [chainSlug_1.ChainSlug.POLYNOMIAL_TESTNET]: hardhatChainName_1.HardhatChainName.POLYNOMIAL_TESTNET,
    [chainSlug_1.ChainSlug.KINTO]: hardhatChainName_1.HardhatChainName.KINTO,
};
