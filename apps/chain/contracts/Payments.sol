// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Payments {
    struct Payment {
        uint256 amount;
        address from;
        string message;
    }

    struct Balance {
        Payment[] payments;
    }

    mapping(address => Balance) balances;

    function currentBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPayment(uint index) public view returns (Payment memory) {
        return balances[msg.sender].payments[index];
    }

    function getPayments() public view returns (Payment[] memory) {
        return balances[msg.sender].payments;
    }

    function pay(
        string memory message
    ) public payable returns (Payment memory) {
        Payment memory _payment = Payment(msg.value, msg.sender, message);

        balances[msg.sender].payments.push(_payment);

        return _payment;
    }
}
