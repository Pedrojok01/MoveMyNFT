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
        throw new Error("Network response was not ok");
    }
    return await res.json();
};

export const useWeb3Data = (): Web3Data => {
    const { address } = useAccount();
    const { chain } = useNetwork();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeb3Data = useCallback(async () => {
        setLoading(true);
        try {
            if (!chain?.id) throw new Error("Chain id is not defined");

            const fetchedData = await fetchData(address as string, chain.id);
            setData(fetchedData?.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [address, chain]);

    useEffect(() => {
        if (address && chain?.id) {
            let isMounted = true; // add a flag to prevent updating state on unmounted component
            fetchWeb3Data().then((data) => {
                if (isMounted) setData(data);
            });
            return () => {
                isMounted = false;
            };
        }
    }, [address, chain?.id, fetchWeb3Data]);

    return {
        data,
        loading,
        error,
        fetchWeb3Data,
    };
};
