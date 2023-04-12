import { bridgeConsts, chainSlugs } from "../../constants";

const executionOverhead = 300000;
const initiateGasLimit = 300000;
const confirmGasLimit = 300000;
const receiveGasLimit = 300000;

export const optimismSwitchboard = (
  network: string,
  socketAddress: string,
  oracleAddress: string,
  signerAddress: string
) => {
  let crossDomainMessengerAddress: string =
    bridgeConsts.crossDomainMessenger[network];

  if (!crossDomainMessengerAddress || crossDomainMessengerAddress == "") {
    throw new Error("Wrong network - crossDomainMessengerAddress is null");
  }

  return {
    contractName: "OptimismSwitchboard",
    args: [
      chainSlugs[network],
      receiveGasLimit,
      confirmGasLimit,
      initiateGasLimit,
      executionOverhead,
      signerAddress,
      socketAddress,
      oracleAddress,
      bridgeConsts.crossDomainMessenger[network],
    ],
    path: "contracts/switchboard/native/OptimismSwitchboard.sol",
  };
};
