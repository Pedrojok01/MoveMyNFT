import { useCallback } from "react";

import { URL } from "@/data/constant";

export const useFetchNFTs = () => {
  const fetchNFTs = useCallback(async (address: string, chainId: number) => {
    const res = await fetch(`${URL}api/getNftFromWallet`, {
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
  }, []);

  return { fetchNFTs };
};
