"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainSlugFromId = exports.toLowerCase = exports.createObj = exports.getAddresses = exports.getRelayAPIKEY = exports.getRelayUrl = exports.getChainSlugsFromDeployedAddresses = exports.storeVerificationParams = exports.storeAllAddresses = exports.storeAddresses = exports.integrationType = exports.getChainSlug = exports.getInstance = exports.sleep = exports.verify = exports.deployContractWithArgs = exports.getOrDeploy = exports.getChainRoleHash = exports.getRoleHash = exports.deployedAddressPath = exports.deploymentsPath = void 0;
const ethers_1 = require("ethers");
const hardhat_1 = require("hardhat");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const src_1 = require("../../../src");
const config_1 = require("../config");
const kinto_1 = require("./kinto/kinto");
exports.deploymentsPath = path_1.default.join(__dirname, `/../../../deployments/`);
const deployedAddressPath = (mode) => exports.deploymentsPath + `${mode}_addresses.json`;
exports.deployedAddressPath = deployedAddressPath;
const getRoleHash = (role) => hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.toUtf8Bytes(role)).toString();
exports.getRoleHash = getRoleHash;
const getChainRoleHash = (role, chainSlug) => hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.defaultAbiCoder.encode(["bytes32", "uint32"], [(0, exports.getRoleHash)(role), chainSlug]));
exports.getChainRoleHash = getChainRoleHash;
const getOrDeploy = async (contractName, path, args, deployUtils) => {
    if (!deployUtils || !deployUtils.addresses)
        throw new Error("No addresses found");
    let contract;
    if (!deployUtils.addresses[contractName]) {
        contract = await deployContractWithArgs(path + `:${contractName}`, args, deployUtils.signer);
        console.log(`${contractName} deployed on ${deployUtils.currentChainSlug} for ${deployUtils.mode} at address ${contract.address}`);
        await (0, exports.storeVerificationParams)([contract.address, contractName, path, args], deployUtils.currentChainSlug, deployUtils.mode);
    }
    else {
        contract = await (0, exports.getInstance)(contractName, deployUtils.addresses[contractName]);
        console.log(`${contractName} found on ${deployUtils.currentChainSlug} for ${deployUtils.mode} at address ${contract.address}`);
    }
    return contract;
};
exports.getOrDeploy = getOrDeploy;
async function deployContractWithArgs(contractName, args, signer) {
    try {
        let contract;
        if ((0, kinto_1.isKinto)()) {
            contract = await (0, kinto_1.deployOnKinto)(contractName, args, signer);
        }
        else {
            const Contract = await hardhat_1.ethers.getContractFactory(contractName);
            // gasLimit is set to undefined to not use the value set in overrides
            contract = await Contract.connect(signer).deploy(...args, {
                ...(0, config_1.overrides)(await signer.getChainId()),
            });
        }
        await contract.deployed();
        return contract;
    }
    catch (error) {
        throw error;
    }
}
exports.deployContractWithArgs = deployContractWithArgs;
const verify = async (address, contractName, path, args) => {
    try {
        const chainSlug = await (0, exports.getChainSlug)();
        if (chainSlug === 31337)
            return true;
        await (0, hardhat_1.run)("verify:verify", {
            address,
            contract: `${path}:${contractName}`,
            constructorArguments: args,
        });
        return true;
    }
    catch (error) {
        console.log("Error during verification", error);
    }
    return false;
};
exports.verify = verify;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay * 1000));
exports.sleep = sleep;
const getInstance = async (contractName, address) => (await hardhat_1.ethers.getContractFactory(contractName)).attach(address);
exports.getInstance = getInstance;
const getChainSlug = async () => {
    if (hardhat_1.network.config.chainId === undefined)
        throw new Error("chain id not found");
    return Number(hardhat_1.network.config.chainId);
};
exports.getChainSlug = getChainSlug;
const integrationType = (integrationName) => hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.defaultAbiCoder.encode(["string"], [integrationName]));
exports.integrationType = integrationType;
const storeAddresses = async (addresses, chainSlug, mode) => {
    if (!fs_1.default.existsSync(exports.deploymentsPath)) {
        await fs_1.default.promises.mkdir(exports.deploymentsPath, { recursive: true });
    }
    const addressesPath = exports.deploymentsPath + `${mode}_addresses.json`;
    const outputExists = fs_1.default.existsSync(addressesPath);
    let deploymentAddresses = {};
    if (outputExists) {
        const deploymentAddressesString = fs_1.default.readFileSync(addressesPath, "utf-8");
        deploymentAddresses = JSON.parse(deploymentAddressesString);
    }
    deploymentAddresses[chainSlug] = addresses;
    fs_1.default.writeFileSync(addressesPath, JSON.stringify(deploymentAddresses, null, 2) + "\n");
};
exports.storeAddresses = storeAddresses;
const storeAllAddresses = async (addresses, mode) => {
    if (!fs_1.default.existsSync(exports.deploymentsPath)) {
        await fs_1.default.promises.mkdir(exports.deploymentsPath, { recursive: true });
    }
    const addressesPath = exports.deploymentsPath + `${mode}_addresses.json`;
    fs_1.default.writeFileSync(addressesPath, JSON.stringify(addresses, null, 2) + "\n");
};
exports.storeAllAddresses = storeAllAddresses;
const storeVerificationParams = async (verificationDetail, chainSlug, mode) => {
    if (!fs_1.default.existsSync(exports.deploymentsPath)) {
        await fs_1.default.promises.mkdir(exports.deploymentsPath);
    }
    const verificationPath = exports.deploymentsPath + `${mode}_verification.json`;
    const outputExists = fs_1.default.existsSync(verificationPath);
    let verificationDetails = {};
    if (outputExists) {
        const verificationDetailsString = fs_1.default.readFileSync(verificationPath, "utf-8");
        verificationDetails = JSON.parse(verificationDetailsString);
    }
    if (!verificationDetails[chainSlug])
        verificationDetails[chainSlug] = [];
    verificationDetails[chainSlug] = [
        verificationDetail,
        ...verificationDetails[chainSlug],
    ];
    fs_1.default.writeFileSync(verificationPath, JSON.stringify(verificationDetails, null, 2) + "\n");
};
exports.storeVerificationParams = storeVerificationParams;
const getChainSlugsFromDeployedAddresses = async (mode = src_1.DeploymentMode.DEV) => {
    if (!fs_1.default.existsSync(exports.deploymentsPath)) {
        await fs_1.default.promises.mkdir(exports.deploymentsPath);
    }
    const addressesPath = exports.deploymentsPath + `${mode}_addresses.json`;
    const outputExists = fs_1.default.existsSync(addressesPath);
    let deploymentAddresses = {};
    if (outputExists) {
        const deploymentAddressesString = fs_1.default.readFileSync(addressesPath, "utf-8");
        deploymentAddresses = JSON.parse(deploymentAddressesString);
        return Object.keys(deploymentAddresses);
    }
};
exports.getChainSlugsFromDeployedAddresses = getChainSlugsFromDeployedAddresses;
const getRelayUrl = async (mode) => {
    switch (mode) {
        case src_1.DeploymentMode.SURGE:
            return process.env.RELAYER_URL_SURGE;
        case src_1.DeploymentMode.PROD:
            return process.env.RELAYER_URL_PROD;
        default:
            return process.env.RELAYER_URL_DEV;
    }
};
exports.getRelayUrl = getRelayUrl;
const getRelayAPIKEY = (mode) => {
    switch (mode) {
        case src_1.DeploymentMode.SURGE:
            return process.env.RELAYER_API_KEY_SURGE;
        case src_1.DeploymentMode.PROD:
            return process.env.RELAYER_API_KEY_PROD;
        default:
            return process.env.RELAYER_API_KEY_DEV;
    }
};
exports.getRelayAPIKEY = getRelayAPIKEY;
const getAddresses = async (chainSlug, mode = src_1.DeploymentMode.DEV) => {
    if (!fs_1.default.existsSync(exports.deploymentsPath)) {
        await fs_1.default.promises.mkdir(exports.deploymentsPath);
    }
    const addressesPath = exports.deploymentsPath + `${mode}_addresses.json`;
    const outputExists = fs_1.default.existsSync(addressesPath);
    let deploymentAddresses = {};
    if (outputExists) {
        const deploymentAddressesString = fs_1.default.readFileSync(addressesPath, "utf-8");
        deploymentAddresses = JSON.parse(deploymentAddressesString);
    }
    return deploymentAddresses[chainSlug];
};
exports.getAddresses = getAddresses;
const createObj = function (obj, keys, value) {
    if (keys.length === 1) {
        obj[keys[0]] = value;
    }
    else {
        const key = keys.shift();
        if (key === undefined)
            return obj;
        obj[key] = (0, exports.createObj)(typeof obj[key] === "undefined" ? {} : obj[key], keys, value);
    }
    return obj;
};
exports.createObj = createObj;
const toLowerCase = (str) => {
    if (!str)
        return "";
    return str.toLowerCase();
};
exports.toLowerCase = toLowerCase;
function getChainSlugFromId(chainId) {
    const MAX_UINT_32 = 4294967295;
    if (chainId < MAX_UINT_32)
        return chainId;
    // avoid conflict for now
    return parseInt(ethers_1.utils.id(chainId.toString()).substring(0, 10));
}
exports.getChainSlugFromId = getChainSlugFromId;
