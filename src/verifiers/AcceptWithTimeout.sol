// SPDX-License-Identifier: GPL-3.0-only
pragma solidity >=0.8.0;

import "../interfaces/IVerifier.sol";

// defines a timeout
// allows a "PAUSER" role to stop processing of messages
// allows an "MANAGER" role to setup "PAUSER"
contract AcceptWithTimeout is IVerifier {
    // immutables
    uint256 public immutable timeoutInSeconds;
    address public immutable socket;
    address public immutable manager;

    // current state of the verifier
    mapping(uint256 => bool) public isChainActive;

    // pauserState
    mapping(address => mapping(uint256 => bool))
        private isPauserForIncomingChain;

    event NewPauser(address pauser, uint256 chain);
    event RemovedPauser(address pauser, uint256 chain);
    event Paused(address pauser, uint256 chain);
    event Unpaused(address pauser, uint256 chain);

    modifier onlyManager() {
        require(msg.sender == manager, "can only be called by manager");
        _;
    }

    modifier onlySocket() {
        require(msg.sender == socket, "can only be called by socket");
        _;
    }

    modifier onlyPauser(uint256 chain) {
        require(
            isPauserForIncomingChain[msg.sender][chain],
            "address not set as pauser by manager"
        );
        _;
    }

    // TODO: restrict the timeout durations to a few select options
    constructor(
        uint256 _timeout,
        address _socket,
        address _manager
    ) {
        require(
            _socket != address(0) || _manager != address(0),
            "invalid addresses"
        );
        timeoutInSeconds = _timeout;
        socket = _socket;
        manager = _manager;
    }

    // function PreExecHook() external onlySocket returns (bool) {
    //     require(isChainActive, "inactive verifier");

    //     // TODO make sure this can be called only by Socket
    //     // TODO fetch delivery time for the packet

    //     // check if enough packed has timeed out or not
    //     // delivery time + timeout

    //     // return true/false
    //     return true;
    // }

    function Pause(uint256 chain) external onlyPauser(chain) {
        isChainActive[chain] = false;
        emit Paused(msg.sender, chain);
    }

    function Activate(uint256 chain) external onlyPauser(chain) {
        isChainActive[chain] = true;
        emit Unpaused(msg.sender, chain);
    }

    function AddPauser(address _newPauser, uint256 _incomingChain)
        external
        onlyManager
    {
        require(
            !isPauserForIncomingChain[_newPauser][_incomingChain],
            "Already set as pauser"
        );
        isPauserForIncomingChain[_newPauser][_incomingChain] = true;
        emit NewPauser(_newPauser, _incomingChain);
    }

    function RemovePauser(address _currentPauser, uint256 _incomingChain)
        external
        onlyManager
    {
        require(
            isPauserForIncomingChain[_currentPauser][_incomingChain],
            "Pauser inactive already"
        );
        isPauserForIncomingChain[_currentPauser][_incomingChain] = false;
        emit RemovedPauser(_currentPauser, _incomingChain);
    }

    function IsPauser(address _pauser, uint256 _incomingChainId)
        external
        view
        returns (bool)
    {
        return isPauserForIncomingChain[_pauser][_incomingChainId];
    }

    function verifyRoot(
        address,
        uint256 remoteChainId_,
        address,
        uint256,
        bytes32
    ) external view returns (bool) {
        // todo: verify timeout
        if (isChainActive[remoteChainId_]) {
            return true;
        } else {
            return false;
        }
    }
}