import { useCallback, useEffect, useState } from "react";

import { useAccount, useNetwork } from "wagmi";

import { URL } from "../data/constant";

const fetchData = async (address: string, chainId: number) => {
    const res = await fetch(`${URL}api/getMoralisData`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            account: address,
            chainId: chainId,
        }),
    });
    if (!res.ok) {
        throw new Error("Something went wrong while fetching web3 data");
    }
    return await res.json();
};

export const useWeb3Data = (): Web3Data => {
    const { address, isConnected } = useAccount();
    const { chain } = useNetwork();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeb3Data = useCallback(async () => {
        setLoading(true);
        try {
            if (!chain?.id) throw new Error("Chain id is not defined");

            const fetchedData = await fetchData(address as string, chain?.id);
            setData(fetchedData.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [address, chain]);

    useEffect(() => {
        if (chain?.id && address) {
            fetchWeb3Data();
        }
    }, [chain?.id, address]);

    return {
        address,
        isConnected,
        data,
        loading,
        error,
        fetchWeb3Data,
    };
};
