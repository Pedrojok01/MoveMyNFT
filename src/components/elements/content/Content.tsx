import { useState, FC, SetStateAction } from "react";

import { StartPane, CollectionSelection, NFTSelection, Transfer, Done } from "@/components/templates";
import { useUserData } from "@/context/UserContextProvider";
import { useSuportedChains } from "@/hooks";
import { useStore } from "@/store/store";

import { StepsPane, Verification } from "..";

const Content: FC = () => {
    const { isConnected } = useUserData();
    const { displayPaneMode, resetDisplayPane } = useStore();
    const isSupportedChain = useSuportedChains();

    const [NFTsToTransfer, setNFTsToTransfer] = useState<Nft[]>([]);
    const [collection, setCollection] = useState<CollectionExtended | undefined>(undefined);
    const [addressTotransfer, setAddressTotransfer] = useState<string>("");

    const getAddressFromTransfer = (value: SetStateAction<string>) => {
        setAddressTotransfer(value);
    };

    const onReset = () => {
        setNFTsToTransfer([]);
        resetDisplayPane();
    };

    return (
        <>
            <div className="steps-pane">
                <StepsPane NFTsToTransfer={NFTsToTransfer} />
            </div>

            <div className="display-pane">
                <div className="pane">
                    {isConnected && isSupportedChain ? (
                        <>
                            {displayPaneMode === "start" && <StartPane />}
                            {displayPaneMode === "selectCollection" && (
                                <CollectionSelection setCollection={setCollection} />
                            )}
                            {displayPaneMode === "nfts" && collection && (
                                <NFTSelection
                                    collection={collection}
                                    NFTsToTransfer={NFTsToTransfer}
                                    setNFTsToTransfer={setNFTsToTransfer}
                                />
                            )}
                            {displayPaneMode === "transfer" && (
                                <Transfer
                                    collectionAddress={collection?.token_address}
                                    NFTsToTransfer={NFTsToTransfer}
                                    getAddressFromTransfer={getAddressFromTransfer}
                                />
                            )}
                            {displayPaneMode === "done" && <Done address={addressTotransfer} onReset={onReset} />}
                        </>
                    ) : (
                        <Verification />
                    )}
                </div>
            </div>
        </>
    );
};

export default Content;
