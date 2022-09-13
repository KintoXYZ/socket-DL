// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

interface IVault {
    /**
     * @notice emits when fee is deducted at outbound
     * @param amount_ total fee amount
     */
    event FeeDeducted(uint256 amount_);

    error InsufficientFee();

    /**
     * @notice deducts the fee required to bridge the packet using msgGasLimit
     * @param remoteChainId_ dest chain id
     * @param msgGasLimit_ gas limit needed to execute inbound at remote plug
     */
    function deductFee(uint256 remoteChainId_, uint256 msgGasLimit_)
        external
        payable;

    /**
     * @notice transfers the `amount_` ETH to `account_`
     * @param account_ address to transfer ETH
     * @param amount_ amount to transfer
     */
    function claimFee(address account_, uint256 amount_) external;

    /**
     * @notice returns the fee required to bridge a message
     * @param remoteChainId_ dest chain id
     * @param msgGasLimit_ gas limit needed to execute inbound at remote plug
     */
    function getFees(uint256 remoteChainId_, uint256 msgGasLimit_)
        external
        view
        returns (uint256);
}
