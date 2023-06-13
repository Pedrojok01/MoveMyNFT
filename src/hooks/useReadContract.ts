import { Address, PublicClient, getContract } from "viem";
import { usePublicClient } from "wagmi";

import { useUserData } from "../context/UserContextProvider";
import { ERC20_ABI, NFT_ABI } from "../data/abis";
import { getContractAddress } from "../data/constant";

export const useReadContract = () => {
    const { address, chainId } = useUserData();
    const publicClient: PublicClient = usePublicClient();
    const mmw = getContractAddress(chainId);

    /* Check if existing allowance of ERC20 token :
     ***********************************************/
    const checkTokenAllowance = async (token: Address) => {
        if (!publicClient || !mmw || !address) return 0;

        const tokenInstance = getContract({
            address: token,
            abi: ERC20_ABI,
            publicClient,
        });

        try {
            const allowance = await tokenInstance.read.allowance([address, mmw]);
            return allowance;
        } catch (error: any) {
            console.error(error.reason ?? error.message ?? error);
            return 0;
        }
    };

    /* Check if existing allowance of NFT 1155 :
     ***********************************************/
    const checkNftAllowance = async (nft: Address) => {
        if (!publicClient || !mmw) return false;

        const nftInstance = getContract({
            abi: NFT_ABI,
            address: nft,
            publicClient: publicClient,
        });

        try {
            const allowance = await nftInstance.read.isApprovedForAll([address, mmw]);
            return allowance;
        } catch (error: any) {
            console.error(error.reason ?? error.message ?? error);
            return false;
        }
    };

    return {
        checkTokenAllowance,
        checkNftAllowance,
    };
};
