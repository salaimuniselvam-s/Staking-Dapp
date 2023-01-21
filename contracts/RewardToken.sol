//SPDX-License-Identifier:MIT
pragma solidity ^0.8.6;

import "./Openzeppelin/ERC20.sol";
import "./Openzeppelin/Ownable.sol";

contract RewardToken is ERC20, Ownable {
    constructor() ERC20("Sms", "sms") {
        _mint(msg.sender, 10000000000000 * 10 ** 18);
    }

    function buyToken() public payable {
        require(msg.value > 0, "Not Enough Balance To Buy Tokens");
        _mint(msg.sender, msg.value * 1000000);
    }

    function withdraw() public onlyOwner {
        (bool sent, ) = payable(owner()).call{value: address(this).balance}("");
        require(sent, "Withdraw Failed");
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
