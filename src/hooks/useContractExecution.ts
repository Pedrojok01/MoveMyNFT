import { useState } from "react";

import { useMongoDB } from "./useMongoDB";
import { useMultipleApprovals } from "./useMultipleApprovals";
import { useWriteContract } from "./useWriteContract";
import { useUserData } from "../context/UserContextProvider";

export const useContractExecution = () => {
    const { setDisplayPaneMode, fetchWeb3Data } = useUserData();
    const { executeBundle, executeTransfer } = useWriteContract();
    const { updateBundle } = useMongoDB();
    const multipleApprove = useMultipleApprovals();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const bundle = async (addresses: string[], numbers: (string | number)[]) => {
        setLoading(true);
        setError(null);

        try {
            await multipleApprove(addresses, numbers);
            const res: any = await executeBundle(addresses, numbers);
            if (res?.success) {
                if (res?.data) {
                    updateBundle(res.data);
                }
                fetchWeb3Data();
                setDisplayPaneMode("transfer");
                return res?.data;
            } else {
                return null;
            }
        } catch (err: any) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const transfer = async (
        receiver: string,
        tokenId: string,
        salt: number,
        addresses: string[],
        numbers: (string | number)[]
    ) => {
        setLoading(true);
        setError(null);

        try {
            const res = await executeTransfer(receiver, tokenId, salt, addresses, numbers);
            if (res.success) {
                fetchWeb3Data();
                setDisplayPaneMode("done");
                return true;
            } else {
                return false;
            }
        } catch (err: any) {
            setError(err);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { bundle, transfer, loading, error };
};
