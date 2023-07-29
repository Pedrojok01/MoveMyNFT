/** @type import('hardhat/config').HardhatUserConfig */
import dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";

const privateKey: string | undefined = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 500,
            },
        },
    },
    networks: {
        mainnet: {
            url: `${process.env.API_NODE_ETH}`,
            accounts: privateKey !== undefined ? [privateKey] : [],
            chainId: 1,
        },
        goerli: {
            url: `${process.env.API_NODE_GOERLI}`,
            accounts: privateKey !== undefined ? [privateKey] : [],
            chainId: 5,
        },
        // Polygon networks
        polygon: {
            url: `${process.env.API_NODE_POLYGON}`,
            accounts: privateKey !== undefined ? [privateKey] : [],
            chainId: 137,
        },
        polygonMumbai: {
            url: `${process.env.API_NODE_POLYGON_MUMBAI}`,
            accounts: privateKey !== undefined ? [privateKey] : [],
            chainId: 80001,
        },
        // BNB Chain networks
        bsc: {
            url: `${process.env.API_NODE_BSC}`,
            accounts: privateKey !== undefined ? [privateKey] : [],
            chainId: 56,
        },
        bscTestnet: {
            url: `${process.env.API_NODE_BSC_TEST}`,
            accounts: privateKey !== undefined ? [privateKey] : [],
            chainId: 97,
        },
    },
    gasReporter: {
        enabled: true,
    },
    contractSizer: {
        runOnCompile: true,
        strict: true,
    },
    etherscan: {
        apiKey: {
            mainnet: process.env.ETHERSCAN_API_KEY ?? "",
            goerli: process.env.ETHERSCAN_API_KEY ?? "",
            polygonMumbai: process.env.POLYGONSCAN_API_KEY ?? "",
            polygon: process.env.POLYGONSCAN_API_KEY ?? "",
            bsc: process.env.BSCSCAN_API_KEY ?? "",
            bscTestnet: process.env.BSCSCAN_API_KEY ?? "",
        },
    },

    // docgen: {
    //   path: "./docs",
    //   clear: true,
    //   runOnCompile: true,
    // },
};

export default config;
