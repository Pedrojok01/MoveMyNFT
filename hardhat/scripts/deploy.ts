import hre, { ethers } from "hardhat";
import fs from "fs";

const name = "MoveMyNFT";
const symbol = "MMW";
const uri = "ipfs://QmUhMMtsyLNPCcjCCsst715Qm5JyqkCdvQqu65aDT95QJh";

async function main() {
    const MoveMyNFT = await ethers.getContractFactory("MoveMyNFT");
    const moveMyNFT = await MoveMyNFT.deploy(name, symbol, uri);
    await moveMyNFT.deployed();

    console.log("\n");
    console.log("MoveMyNFT deployed to: ", moveMyNFT.address);
    console.log("\n");

    // Get Staking Contract ABI
    const abiFile = JSON.parse(fs.readFileSync("./artifacts/contracts/MoveMyNFT.sol/MoveMyNFT.json", "utf8"));
    const abi = JSON.stringify(abiFile.abi);

    console.log("MoveMyNFT ABI:");
    console.log("\n");
    console.log(abi);
    console.log("\n");

    /** WAITING:
     ************/
    await moveMyNFT.deployTransaction.wait(5);

    /** VERIFICATION:
     *****************/
    await hre.run("verify:verify", {
        address: moveMyNFT.address,
        constructorArguments: [name, symbol, uri],
    });
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
