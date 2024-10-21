// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Demo {
    string str = "dasdsa";
    address owner;

    event Paid(address indexed _from, uint _value, uint timestamp);

    constructor() {
        owner = msg.sender;
    }

    function getStr() public view returns (string memory) {
        return str;
    }

    function pay() public payable {
        emit Paid(msg.sender, msg.value, block.timestamp);
    }

    function widtdrawAll(address payable _to) external {
        require(owner == msg.sender, "you are not owner!");

        _to.transfer(address(this).balance);
    }
}
