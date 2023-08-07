import { Address, PublicClient, getContract } from "viem";
import { usePublicClient } from "wagmi";

import { useUserData } from "@/context/UserContextProvider";
import { NFT_721_ABI } from "@/data/abis";
import { MOVE_MY_NFT } from "@/data/constant";

export const useReadContract = () => {
  const { address } = useUserData();
  const publicClient: PublicClient = usePublicClient();

  /* Check existing allowance of an NFT collection (both ERC721 or ERC1155):
   **************************************************************************/
  const checkNftAllowance = async (nft: Address): Promise<boolean> => {
    if (!publicClient) throw new Error("Public client not initialized");

    const nftInstance = getContract({
      abi: NFT_721_ABI,
      address: nft,
      publicClient: publicClient,
    });

    try {
      const allowance = await nftInstance.read.isApprovedForAll([address as string, MOVE_MY_NFT]);
      return allowance as boolean;
    } catch (error: any) {
      console.error(error.reason ?? error.message ?? error);
      return false;
    }
  };

  return {
    checkNftAllowance,
  };
};
