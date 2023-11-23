import { ChainSlug } from "./chainSlug";
import { HardhatChainName } from "./hardhatChainName";

export const hardhatChainNameToSlug = {
  [HardhatChainName.ARBITRUM]: ChainSlug.ARBITRUM,
  [HardhatChainName.ARBITRUM_GOERLI]: ChainSlug.ARBITRUM_GOERLI,
  [HardhatChainName.ARBITRUM_SEPOLIA]: ChainSlug.ARBITRUM_SEPOLIA,
  [HardhatChainName.OPTIMISM]: ChainSlug.OPTIMISM,
  [HardhatChainName.OPTIMISM_GOERLI]: ChainSlug.OPTIMISM_GOERLI,
  [HardhatChainName.OPTIMISM_SEPOLIA]: ChainSlug.OPTIMISM_SEPOLIA,
  [HardhatChainName.BSC]: ChainSlug.BSC,
  [HardhatChainName.BSC_TESTNET]: ChainSlug.BSC_TESTNET,
  [HardhatChainName.MAINNET]: ChainSlug.MAINNET,
  [HardhatChainName.GOERLI]: ChainSlug.GOERLI,
  [HardhatChainName.SEPOLIA]: ChainSlug.SEPOLIA,
  [HardhatChainName.POLYGON_MAINNET]: ChainSlug.POLYGON_MAINNET,
  [HardhatChainName.POLYGON_MUMBAI]: ChainSlug.POLYGON_MUMBAI,
  [HardhatChainName.AEVO_TESTNET]: ChainSlug.AEVO_TESTNET,
  [HardhatChainName.AEVO]: ChainSlug.AEVO,
  [HardhatChainName.HARDHAT]: ChainSlug.HARDHAT,
  [HardhatChainName.AVALANCHE]: ChainSlug.AVALANCHE,
  [HardhatChainName.LYRA_TESTNET]: ChainSlug.LYRA_TESTNET,
  [HardhatChainName.LYRA]: ChainSlug.LYRA,
  [HardhatChainName.XAI_TESTNET]: ChainSlug.XAI_TESTNET,
  [HardhatChainName.SX_NETWORK_TESTNET]: ChainSlug.SX_NETWORK_TESTNET,
  [HardhatChainName.CDK_TESTNET]: ChainSlug.CDK_TESTNET,
};
