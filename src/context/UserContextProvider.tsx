"use client";
import React, { FC, ReactNode, useCallback, useContext, useEffect, useMemo } from "react";

import { v4 as uuidv4 } from "uuid";
import { useAccount } from "wagmi";

import { useFetchNFTs } from "@/hooks";
import { useStore } from "@/store/store";

import UserContext from "./context";

type Props = {
  children: ReactNode;
};

const UserDataProvider: FC<Props> = ({ children }) => {
  const { address, isConnected, chain } = useAccount();
  const { setCollections, setLoading, setError, reset } = useStore();
  const { fetchNFTs } = useFetchNFTs();
  const chainId: number = chain !== undefined ? chain.id : 1;

  useEffect(() => {
    reset();
  }, [chainId, reset]);

  const fetchWeb3Data = useCallback(async () => {
    setLoading(true);

    try {
      const fetchedData: FetchedData = await fetchNFTs(address as string, chainId);

      let collections: CollectionExtended[] = fetchedData.data.collections;
      collections = collections.filter((collection) => !collection.possible_spam);
      const nfts: EvmNft[] = fetchedData.data.userNfts.nfts;

      nfts.forEach((nft: EvmNft) => {
        const collection: CollectionExtended | undefined = collections.find(
          (coll: Collection) => coll.token_address.toLowerCase() === nft.token_address.toLowerCase()
        );

        if (collection) {
          collection.uuid = uuidv4();

          if (!collection.image && nft.normalized_metadata.image) {
            collection.image = nft.normalized_metadata.image;
          }

          if (!collection.nfts) {
            collection.nfts = []; // initialize the array if it doesn't exist
          }
          collection.nfts.push(nft);
        }
      });

      setCollections(collections);
    } catch (error) {
      console.error(error);
      setError((error as Error).message ?? error);
    } finally {
      setLoading(false);
    }
  }, [address, chainId, fetchNFTs, setCollections, setLoading, setError]);

  useEffect(() => {
    if (address && chainId) {
      fetchWeb3Data();
    }
  }, [address, chainId, fetchWeb3Data]);

  const value = useMemo(
    () => ({
      address,
      chainId,
      isConnected,
      fetchWeb3Data,
    }),
    [address, chainId, isConnected, fetchWeb3Data]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserData = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within UserDataProvider");
  }
  return context;
};

export { UserDataProvider, useUserData };
