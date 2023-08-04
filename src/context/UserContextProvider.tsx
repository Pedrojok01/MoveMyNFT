import React, { FC, ReactNode, useCallback, useContext, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { useAccount, useNetwork } from "wagmi";

import { useFetchNFTs } from "@/hooks";
import { useStore } from "@/store/store";

import UserContext from "./context";

type Props = {
    children: ReactNode;
};

const UserDataProvider: FC<Props> = ({ children }) => {
    const { address, isConnected } = useAccount();
    const { setCollections, setLoading, setError, reset } = useStore();
    const { fetchNFTs } = useFetchNFTs();
    const { chain } = useNetwork();
    const chainId: number = chain !== undefined ? chain.id : 1;

    useEffect(() => {
        reset();
    }, [chainId]);

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
        } catch (error: any) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, chainId]);

    useEffect(() => {
        if (address && chainId) {
            fetchWeb3Data();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, chainId]);

    return (
        <UserContext.Provider
            value={{
                address,
                chainId,
                isConnected,
                fetchWeb3Data,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

const useUserData = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUserData must be used within UserDataProvider");
    }
    return context;
};

export { UserDataProvider, useUserData };
