// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

// import {Base64} from "./libraries/Base64.sol";

abstract contract Termsable is Ownable {
    event AcceptedTerms(address sender, uint256 tokenId, string terms);
    uint256 _chainId = 137;
    string _renderer = "ABCDEFG";
    mapping(address => mapping(uint256 => bool)) hasAcceptedTerms;
    mapping(uint256 => string) tokenTermURLs;

    string _termsURL = "LMNOPQRST";

    function _acceptedTerms(address to, uint256 tokenId)
        internal
        view
        returns (bool)
    {
        return hasAcceptedTerms[to][tokenId];
    }

    function acceptTerms(uint256 tokenId, string memory _newtermsURL) external {
        require(
            keccak256(bytes(_newtermsURL)) ==
                keccak256(bytes(termsURL(tokenId))),
            "Terms URL does not match"
        );
        hasAcceptedTerms[msg.sender][tokenId] = true;
        emit AcceptedTerms(msg.sender, tokenId, termsURL(tokenId));
    }

    function acceptedTerms(address to, uint256 tokenId)
        external
        view
        returns (bool)
    {
        return hasAcceptedTerms[to][tokenId];
    }

    function termsURL(uint256 tokenId) public view returns (string memory) {
        if (bytes(tokenTermURLs[tokenId]).length == 0) {
            return
                string(
                    abi.encodePacked(
                        "ipfs://",
                        _renderer,
                        "/#/",
                        _termsURL,
                        "/",
                        Strings.toString(_chainId),
                        ":",
                        Strings.toHexString(uint160(address(this)), 20),
                        "/",
                        Strings.toString(tokenId),
                        "/",
                        Strings.toString(block.number)
                    )
                );
        } else {
            return
                string(
                    abi.encodePacked(
                        ("ipfs://"),
                        _renderer,
                        "/#/",
                        tokenTermURLs[tokenId],
                        "/",
                        Strings.toString(_chainId),
                        ":",
                        Strings.toHexString(uint160(address(this)), 20),
                        "/",
                        Strings.toString(tokenId),
                        "/",
                        Strings.toString(block.number)
                    )
                );
        }
    }

    function setTermsURL(uint256 tokenID, string memory _newTermsURL)
        external
        onlyOwner
    {
        tokenTermURLs[tokenID] = _newTermsURL;
    }

    function setDefaultTerms(string memory _newTermsURL) external onlyOwner {
        _termsURL = _newTermsURL;
    }

    function defaultTerms() external view returns (string memory) {
        return _termsURL;
    }
}

contract Doc_20 is ERC1155Supply, ERC1155Burnable, Ownable, Termsable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    event MintNFT(address sender, uint256 tokenId);

    string public name_;
    string public symbol_;
    uint256 amount;

    // string uri;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri
    ) ERC1155(_uri) {
        name_ = _name;
        symbol_ = _symbol;
    }

    function name() public view returns (string memory) {
        return name_;
    }

    function symbol() public view returns (string memory) {
        return symbol_;
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override(ERC1155, ERC1155Supply) {
        for (uint i = 0; i < ids.length; i++) {
            require(_acceptedTerms(to, ids[i]), "Terms not accepted");
        }

        // require(_acceptedTerms(to, ids), "Terms not accepted");
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function mint() public {
        uint256 newItemId = _tokenIds.current();

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        '"',
                        '", "description": "A highly acclaimed collection of BLOCS.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(""),
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        _mint(msg.sender, newItemId, amount, "");

        _setURI(finalTokenUri);

        _tokenIds.increment();
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        emit MintNFT(msg.sender, newItemId);
    }
}
