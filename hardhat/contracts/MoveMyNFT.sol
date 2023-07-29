// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface ERC721Partial {
    function transferFrom(address from, address to, uint256 tokenId) external;
}

interface ERC1155Partial {
    function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes calldata data) external;
}

contract MoveMyNFT {
    uint256 public immutable MAX_BATCH_SIZE = 500;

    error BatchTooLarge(uint256 batchLength, uint256 maxBatchSize);
    error BatchSizeNotMatching(uint256 tokenIdsLength, uint256 tokenAmountsLength);

    modifier batchSizeOK(uint256 batchSize) {
        _batchSizeOK(batchSize);
        _;
    }

    function _batchSizeOK(uint256 _batchSize) private pure {
        if (_batchSize > MAX_BATCH_SIZE) {
            revert BatchTooLarge({batchLength: _batchSize, maxBatchSize: MAX_BATCH_SIZE});
        }
    }

    /**
     * @dev batchTransferERC721
     * @notice Transfer ERC721 tokens from the caller to a recipient.
     * @notice Don't forget to execute setApprovalForAll first to authorize this contract.
     * @param tokenContract Address of the ERC721 contract;
     * @param recipient Address of the recipient;
     * @param tokenIds IDs of the tokens to be transferred;
     */
    function batchTransferERC721(
        ERC721Partial tokenContract,
        address recipient,
        uint256[] calldata tokenIds
    ) external batchSizeOK(tokenIds.length) {
        for (uint256 i; i < tokenIds.length; ) {
            tokenContract.transferFrom(msg.sender, recipient, tokenIds[i]);
            unchecked {
                i++;
            }
        }
    }

    /**
     * @dev batchTransferERC1155
     * @notice Transfer ERC1155 tokens from the caller to a recipient.
     * @notice Don't forget to execute setApprovalForAll first to authorize this contract.
     * @param tokenContract Address of the ERC1155 contract;
     * @param recipient Address of the recipient;
     * @param tokenIds IDs of the tokens to be transferred;
     * @param tokenAmounts Amounts of each token Ids to be transferred;
     */
    function batchTransferERC1155(
        ERC1155Partial tokenContract,
        address recipient,
        uint256[] calldata tokenIds,
        uint256[] calldata tokenAmounts
    ) external batchSizeOK(tokenIds.length) {
        if (tokenIds.length != tokenAmounts.length) {
            revert BatchSizeNotMatching({tokenIdsLength: tokenIds.length, tokenAmountsLength: tokenAmounts.length});
        }

        for (uint256 i; i < tokenIds.length; ) {
            tokenContract.safeTransferFrom(msg.sender, recipient, tokenIds[i], tokenAmounts[i], "");
            unchecked {
                i++;
            }
        }
    }
}
