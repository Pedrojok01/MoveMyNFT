import { ethers } from "hardhat";
import { amounts, data, ids } from "./data";

export async function deploy() {
  const [owner, user1, user2] = await ethers.getSigners();

  // Deploy all contracts:
  const Dummy721 = await ethers.getContractFactory("Dummy721");
  const dummy721 = await Dummy721.deploy();
  await dummy721.waitForDeployment();

  const Dummy1155 = await ethers.getContractFactory("Dummy1155");
  const dummy1155 = await Dummy1155.deploy();
  await dummy1155.waitForDeployment();

  const MoveMyNFT = await ethers.getContractFactory("MoveMyNFT");
  const moveMyNFT = await MoveMyNFT.deploy();
  await moveMyNFT.waitForDeployment();

  // Mint some NFTs ERC721 & 1155 to user1:
  for (let i = 0; i < 100; i++) {
    dummy721.safeMint(user1.address);
  }
  await dummy1155.mintBatch(user1.address, ids, amounts, data);

  const addressMoveMyNFT = await moveMyNFT.getAddress();
  const addressDummy721 = await dummy721.getAddress();
  const addressDummy1155 = await dummy1155.getAddress();

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
