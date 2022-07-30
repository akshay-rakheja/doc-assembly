// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@polydocs/contracts/contracts/termsable/TermsableNoToken.sol";

// import {Base64} from "./libraries/Base64.sol";

contract Test721_NoToken is ERC721URIStorage, Ownable, TermsableNoToken {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds; // Changed to public to test for the timebeing
    event MintNFT(address sender, uint256 tokenId);

    constructor() ERC721("PolyDocs", "DOCS") {
        console.log("This is my NFT contract. Woah!");
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        require(_acceptedTerms(to), "Terms not accepted");
        super._transfer(from, to, tokenId);
    }

    function _safeMint(address _to, uint256 _tokenId) internal override {
        require(_acceptedTerms(_to), "Terms not accepted");
        super._safeMint(_to, _tokenId);
    }

    function mint(string memory _tokenURI) public onlyOwner {
        uint256 newItemId = _tokenIds.current();

        // string memory json = Base64.encode(
        //     bytes(
        //         string(
        //             abi.encodePacked(
        //                 '{"name": "',
        //                 '"',
        //                 '", "description": "A highly acclaimed collection of BLOCS.", "image": "data:image/svg+xml;base64,',
        //                 Base64.encode(""),
        //                 '"}'
        //             )
        //         )
        //     )
        // );

        // string memory finalTokenUri = string(
        //     abi.encodePacked("data:application/json;base64,", json)
        // );

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, _tokenURI);

        _tokenIds.increment();
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        emit MintNFT(msg.sender, newItemId);
    }
}
