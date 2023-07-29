import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { deploy } from "./deploy";
import { amounts, data, ids } from "./data";
require("@nomicfoundation/hardhat-ethers");

async function deployFixture() {
    const { owner, user1, user2, dummy721, addressDummy721, dummy1155, addressDummy1155, moveMyNFT, addressMoveMyNFT } =
        await deploy();

    return {
        owner,
        user1,
        user2,
        dummy721,
        addressDummy721,
        dummy1155,
        addressDummy1155,
        moveMyNFT,
        addressMoveMyNFT,
    };
}

describe("Move My NFT", function () {
    it("should deploy MoveMyNFT correctly", async () => {
        const { moveMyNFT, dummy721, dummy1155 } = await loadFixture(deployFixture);
        const address = await moveMyNFT.getAddress();
        expect(address).to.be.a("string");
        expect(address).to.have.lengthOf(42);

        expect(await dummy721.name()).to.equal("Dummy721");
        expect(await dummy721.symbol()).to.equal("DUM");
        expect(await dummy721.tokenURI(0)).to.equal("https://dummy_uri.com/0");

        expect(await dummy1155.uri(0)).to.equal("ipfs://Qm...Dummy1155/");
    });

    it("should not be possible to transfer any ERC721 not owned", async () => {
        const { moveMyNFT, addressMoveMyNFT, dummy721, addressDummy721, user1, user2 } = await loadFixture(
            deployFixture
        );

        // revert because no approval
        await expect(moveMyNFT.connect(user2).batchTransferERC721(addressDummy721, user1, ids)).to.be.revertedWith(
            "ERC721: caller is not token owner or approved"
        );

        // approve
        await dummy721.connect(user2).setApprovalForAll(addressMoveMyNFT, true);

        // revert because not owned
        await expect(moveMyNFT.connect(user2).batchTransferERC721(addressDummy721, user1, ids)).to.be.revertedWith(
            "ERC721: caller is not token owner or approved"
        );
    });

    it("shouldn't be possible to batch transfer more ERC721 than allowed", async () => {
        const { moveMyNFT, addressMoveMyNFT, dummy721, addressDummy721, user1, user2 } = await loadFixture(
            deployFixture
        );

        // approve
        await dummy721.connect(user1).setApprovalForAll(addressMoveMyNFT, true);

        // mint more NFTs to be over the transfer limit (100 + 500)
        for (let i = 0; i < 500; i++) {
            dummy721.safeMint(user1.address);
        }

        // revert because over transfer limit
        await expect(
            moveMyNFT.connect(user1).batchTransferERC721(addressDummy721, user2, Array.from(Array(600).keys()))
        ).to.be.revertedWithCustomError(moveMyNFT, "BatchTooLarge");
    });

    it("should be possible to batch transfer ERC721 if owned and approved", async () => {
        const { moveMyNFT, addressMoveMyNFT, dummy721, addressDummy721, user1, user2 } = await loadFixture(
            deployFixture
        );

        // approve
        await dummy721.connect(user1).setApprovalForAll(addressMoveMyNFT, true);

        // batch transfer all ERC721 NFTs
        await moveMyNFT.connect(user1).batchTransferERC721(addressDummy721, user2, ids);

        // check that all NFTs have been transferred
        for (let i = 0; i < 100; i++) {
            expect(await dummy721.ownerOf(i)).to.equal(user2.address);
        }
    });

    it("should not be possible to transfer any ERC1155 not owned", async () => {
        const { moveMyNFT, addressMoveMyNFT, dummy1155, addressDummy1155, user1, user2 } = await loadFixture(
            deployFixture
        );

        // revert because no approval
        await expect(
            moveMyNFT.connect(user2).batchTransferERC1155(addressDummy1155, user1, ids, amounts)
        ).to.be.revertedWith("ERC1155: caller is not token owner or approved");

        // approve
        await dummy1155.connect(user2).setApprovalForAll(addressMoveMyNFT, true);

        // revert even with approval because not owned
        await expect(
            moveMyNFT.connect(user2).batchTransferERC1155(addressDummy1155, user1, ids, amounts)
        ).to.be.revertedWith("ERC1155: insufficient balance for transfer");
    });

    it("shouldn't be possible to batch transfer more ERC1155 than allowed", async () => {
        const { moveMyNFT, addressMoveMyNFT, dummy1155, addressDummy1155, user1, user2 } = await loadFixture(
            deployFixture
        );

        // approve
        await dummy1155.connect(user1).setApprovalForAll(addressMoveMyNFT, true);

        // mint more NFTs to be over the transfer limit (100 + 500)
        const overSizedIds = Array.from(Array(600).keys());
        const overSizedAmounts = new Array(600).fill(1);
        await dummy1155.mintBatch(user1.address, overSizedIds, overSizedAmounts, data);

        // revert because over transfer limit
        await expect(
            moveMyNFT.connect(user1).batchTransferERC1155(addressDummy1155, user2, overSizedIds, overSizedAmounts)
        ).to.be.revertedWithCustomError(moveMyNFT, "BatchTooLarge");
    });

    it("shouldn't be possible to batch transfer ERC1155 if arrays size don't match", async () => {
        const { moveMyNFT, addressMoveMyNFT, dummy1155, addressDummy1155, user1, user2 } = await loadFixture(
            deployFixture
        );

        // approve
        await dummy1155.connect(user1).setApprovalForAll(addressMoveMyNFT, true);

        // mint more NFTs to so we have different arrays size (100 + 300)
        const overSizedIds = Array.from(Array(300).keys());
        const overSizedAmounts = new Array(300).fill(1);
        await dummy1155.mintBatch(user1.address, overSizedIds, overSizedAmounts, data);

        // revert because over transfer limit
        await expect(
            moveMyNFT.connect(user1).batchTransferERC1155(addressDummy1155, user2, overSizedIds, amounts)
        ).to.be.revertedWithCustomError(moveMyNFT, "BatchSizeNotMatching");
    });

    it("should be possible to batch transfer ERC1155 if owned and approved", async () => {
        const { moveMyNFT, addressMoveMyNFT, dummy1155, addressDummy1155, user1, user2 } = await loadFixture(
            deployFixture
        );

        // approve
        await dummy1155.connect(user1).setApprovalForAll(addressMoveMyNFT, true);

        // batch transfer all ERC721 NFTs
        await moveMyNFT.connect(user1).batchTransferERC1155(addressDummy1155, user2, ids, amounts);

        // // check that all NFTs have been transferred
        for (let i = 0; i < 100; i++) {
            expect(await dummy1155.balanceOf(user1.address, i)).to.equal(0);
            expect(await dummy1155.balanceOf(user2.address, i)).to.equal(1);
        }
    });

    // Uncomment to test gas optimization
    // it("For Gas Optimization", async () => {
    //     const { moveMyNFT, addressMoveMyNFT, dummy721, addressDummy721, dummy1155, addressDummy1155, user1, user2 } =
    //         await loadFixture(deployFixture);

    //     // approve
    //     await dummy721.connect(user1).setApprovalForAll(addressMoveMyNFT, true);
    //     await dummy721.connect(user2).setApprovalForAll(addressMoveMyNFT, true);
    //     await dummy1155.connect(user1).setApprovalForAll(addressMoveMyNFT, true);

    //     // batch transfer all NFTs multiple times
    //     await dummy1155.mintBatch(user1.address, ids, new Array(100).fill(20), data);
    //     for (let i = 0; i < 20; i++) {
    //         await moveMyNFT.connect(user1).batchTransferERC1155(addressDummy1155, user2, ids, amounts);
    //     }
    //     for (let i = 0; i < 10; i++) {
    //         await moveMyNFT
    //             .connect(user1)
    //             .batchTransferERC721(addressDummy721, user2, ids)
    //             .then(() => {
    //                 moveMyNFT.connect(user2).batchTransferERC721(addressDummy721, user1, ids);
    //             });
    //     }
    // });
});
