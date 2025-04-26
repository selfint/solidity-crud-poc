// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract PostBoard {
    string[] public posts;

    function addPost(string memory text) public {
        posts.push(text);
        console.log("here %s", text);
    }

    function getPosts() public view returns (string[] memory) {
        return posts;
    }
}
