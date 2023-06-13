export const isProdEnv = process.env.NEXT_PUBLIC_NODE_ENV === "production" ? true : false;

export const MAX_INT = 2n ** 256n - 1n;
export const URL = process.env.NEXT_PUBLIC_URL;

export const SUPPORTED_CHAIN = {
    mainnet: [1, 56, 137],
    testnet: [5, 97, 80001],
};

// Production:
export const MOVE_MY_NFT_ETHEREUM = "0x1d7bcd9CfAA5A9BBBE715Db1Ec7aC7388bf4Aa0d"; // Still OLD version with fees
export const MOVE_MY_NFT_BSC = "0x64B0ba5FB8df536aD40BAEA72994d3C8C79d137C"; // OK & verified
export const MOVE_MY_NFT_POLYGON = "0x5Bc35d7Fd9c8B21BEb9257B04128b18CAf794D3C"; // OK & verified

// Development:
export const MOVE_MY_NFT_GOERLI = "0xfB3F6008949358DcDAb3229c99aB3adf352345f9"; // OK & verified
export const MOVE_MY_NFT_MUMBAI = "0xa103518FD4Ab9dC47527D6A430cBd82e1eF4C200"; // OK & verified
export const MOVE_MY_NFT_BSC_TESTNET = "0x0A8f1B95D33CDb475E3d00Ddb3f4A692382Ec248"; // OK & verified

export const getContractAddress = (chainId: number): string => {
    switch (chainId) {
        case 1:
            return MOVE_MY_NFT_ETHEREUM;
        case 5:
            return MOVE_MY_NFT_GOERLI;
        case 56:
            return MOVE_MY_NFT_BSC;
        case 97:
            return MOVE_MY_NFT_BSC_TESTNET;
        case 137:
            return MOVE_MY_NFT_POLYGON;
        case 80001:
            return MOVE_MY_NFT_MUMBAI;
        default:
            return MOVE_MY_NFT_ETHEREUM;
        // throw new Error("ChainId unknown - Can not get contract address.");
    }
};
