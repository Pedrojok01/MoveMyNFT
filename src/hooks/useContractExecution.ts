import { useStore } from "@/store/store";

import { useWriteContract } from "./useWriteContract";
import { useUserData } from "../context/UserContextProvider";
import { useReadContract } from "./useReadContract";

export const useContractExecution = () => {
    const { setDisplayPaneMode, setLoading, setError } = useStore();
    const { fetchWeb3Data } = useUserData();
    const { checkNftAllowance } = useReadContract();
    const { approveNft, executeTransfer721, executeTransfer1155 } = useWriteContract();

    const finalizeTransferSuccess = async () => {
        fetchWeb3Data();
        setDisplayPaneMode("done");
    };

    const handleErc721Transfer = async (collectionAddress: string, to: string, tokenIds: string[]) => {
        const res = await executeTransfer721(collectionAddress, to, tokenIds);
        if (!res.success) throw new Error(res.error);
        finalizeTransferSuccess();
    };

    const handleErc1155Transfer = async (
        collectionAddress: string,
        to: string,
        tokenIds: string[],
        tokenAmounts: number[]
    ) => {
        const res = await executeTransfer1155(collectionAddress, to, tokenIds, tokenAmounts);
        if (!res.success) throw new Error(res.error);
        finalizeTransferSuccess();
    };

    const transfer = async (
        collectionAddress: string,
        collectionType: string,
        to: string,
        tokenIds: string[],
        tokenAmounts?: number[]
    ) => {
        setLoading(true);
        setError(null);

        try {
            // 1. Handle approval:
            let approval: boolean = await checkNftAllowance(collectionAddress as `0x${string}`);
            if (!approval) {
                const approvalStatus = await approveNft(collectionAddress);
                if (!approvalStatus.success) throw new Error("Approval failed. Please try again.");
            }

            // 2. Handle batch transfer:
            const type = collectionType.toLowerCase();
            if (type === "erc721") {
                await handleErc721Transfer(collectionAddress, to, tokenIds);
            } else if (type === "erc1155") {
                if (!tokenAmounts) throw new Error("Token amounts are required for ERC1155 transfer");
                await handleErc1155Transfer(collectionAddress, to, tokenIds, tokenAmounts);
            } else {
                throw new Error(`Unsupported collection type: ${collectionType}`);
            }
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { transfer };
};
