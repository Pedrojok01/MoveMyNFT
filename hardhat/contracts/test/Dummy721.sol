// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Dummy721 is ERC721 {
    uint256 private _tokenIdCounter;

    constructor() ERC721("Dummy721", "DUM") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://dummy_uri.com/";
    }

    function safeMint(address to) public {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter += 1;
        _safeMint(to, tokenId);
    }
}
