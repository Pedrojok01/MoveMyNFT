import hre, { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const MoveMyNFT = await ethers.getContractFactory("MoveMyNFT");
  const moveMyNFT = await MoveMyNFT.deploy();
  await moveMyNFT.waitForDeployment();
  const contractAddress = await moveMyNFT.getAddress();

  console.log("\n");
  console.log("MoveMyNFT deployed to: ", contractAddress);
  console.log("\n");

  // Get Staking Contract ABI
  const abiFile = JSON.parse(
    fs.readFileSync("./artifacts/contracts/MoveMyNFT.sol/MoveMyNFT.json", "utf8")
  );
  const abi = JSON.stringify(abiFile.abi);

  console.log("MoveMyNFT ABI:");
  console.log("\n");
  console.log(abi);
  console.log("\n");

  /** WAIT BEFORE VERIF:
   **********************/
  await moveMyNFT.deploymentTransaction()?.wait(10);

  /** VERIFICATION:
   *****************/
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
