import { getContract } from "viem";
import { usePublicClient } from "wagmi";

import { useUserData } from "../context/UserContextProvider";
import { ERC20_ABI, NFT_ABI } from "../data/abis";
import { getContractAddress } from "../data/constant";

export const useReadContract = () => {
    const { address, chainId } = useUserData();
    const publicClient = usePublicClient();
    const mmw = getContractAddress(chainId);

    /* Check if existing allowance of ERC20 token :
     ***********************************************/
    const checkTokenAllowance = async (token: string) => {
        if (!publicClient || !mmw) return 0;

        const tokenInstance: any = getContract({
            abi: ERC20_ABI,
            address: token as `0x${string}`,
            publicClient: publicClient,
        });

        try {
            const allowance = await tokenInstance.allowance(address, mmw);
            return allowance;
        } catch (error: any) {
            console.error(error.reason ?? error.message);
            return 0;
        }
    };

    /* Check if existing allowance of NFT 1155 :
     ***********************************************/
    const checkNftAllowance = async (nft: string) => {
        if (!publicClient || !mmw) return false;

        const nftInstance: any = getContract({
            abi: NFT_ABI,
            address: nft as `0x${string}`,
            publicClient: publicClient,
        });

        try {
            const allowance = await nftInstance.isApprovedForAll(address, mmw);
            return allowance;
        } catch (error: any) {
            console.error(error.reason ?? error.message);
            return false;
        }
    };

    return {
        checkTokenAllowance,
        checkNftAllowance,
    };
};
