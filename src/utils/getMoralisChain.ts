import { EvmChain } from "@moralisweb3/common-evm-utils";

export const getMoralisChain = (chainId: number) => {
    switch (chainId) {
        case 1:
            return EvmChain.ETHEREUM;
        case 5:
            return EvmChain.GOERLI;
        case 56:
            return EvmChain.BSC;
        case 97:
            return EvmChain.BSC_TESTNET;
        case 137:
            return EvmChain.POLYGON;
        case 80001:
            return EvmChain.MUMBAI;
        default:
            return EvmChain.ETHEREUM;
    }
};
