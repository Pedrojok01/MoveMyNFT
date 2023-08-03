import { PublicClient, getContract } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";

import { useUserData } from "@/context/UserContextProvider";
import { MMNFT_ABI, NFT_721_ABI } from "@/data/abis";
import { MOVE_MY_NFT } from "@/data/constant";
import { handleErrors } from "@/utils/errorHandling";
import { notifyError, notifySuccess, openNotification } from "@/utils/notifications";

export const useWriteContract = () => {
    const { chainId } = useUserData();
    const publicClient: PublicClient = usePublicClient();
    const { data: walletClient } = useWalletClient();

    /* Approve an NFT collection (both ERC721 and ERC1155):
     *******************************************************/
    const approveNft = async (nft: string) => {
        if (!walletClient) throw new Error("Wallet client not initialized");

        const nftInstance = getContract({
            abi: NFT_721_ABI, // Same for ERC1155
            address: nft as `0x${string}`,
            walletClient: walletClient,
        });

        try {
            const hash = await nftInstance.write.setApprovalForAll([MOVE_MY_NFT, true]);
            await publicClient.waitForTransactionReceipt({
                confirmations: 3,
                hash: hash,
            });
            openNotification("success", "NFT Approval set", "Allowance successfully set.");
            return { success: true, data: hash, error: null };
        } catch (error: any) {
            const message = handleErrors(error, MMNFT_ABI);
            notifyError(message);
            return { success: false, data: null, error: message };
        }
    };

    /* Execute a batch transfer:
     ****************************/

    type Method = "batchTransferERC721" | "batchTransferERC1155";
    type Params = [string, string, string[], number[]?];

    const executeTransfer = async (method: Method, params: Params) => {
        if (!walletClient) throw new Error("Wallet client not initialized");

        const MOVE_MY_NFTInstance = getContract({
            abi: MMNFT_ABI,
            address: MOVE_MY_NFT as `0x${string}`,
            walletClient: walletClient,
        });

        try {
            const hash = await MOVE_MY_NFTInstance.write[method](params);
            const transaction = await publicClient.waitForTransactionReceipt({
                confirmations: 3,
                hash: hash,
            });
            notifySuccess(hash, chainId);
            return { success: true, data: transaction, error: null };
        } catch (error: any) {
            const message = handleErrors(error, MMNFT_ABI);
            notifyError(message);
            return { success: false, data: null, error: message };
        }
    };

    const executeTransfer721 = (collectionAddress: string, receiver: string, tokenIds: string[]) =>
        executeTransfer("batchTransferERC721", [collectionAddress, receiver, tokenIds]);

    const executeTransfer1155 = (
        collectionAddress: string,
        receiver: string,
        tokenIds: string[],
        tokenAmounts: number[]
    ) => executeTransfer("batchTransferERC1155", [collectionAddress, receiver, tokenIds, tokenAmounts]);

    return {
        approveNft,
        executeTransfer721,
        executeTransfer1155,
    };
};
