import { useState, FC, SetStateAction } from "react";

import { StartPane, CollectionSelection, NFTSelection, Transfer, Done } from "@/components/templates";
import { useUserData } from "@/context/UserContextProvider";
import { useSuportedChains } from "@/hooks";
import { useStore } from "@/store/store";

import { StepsPane, Verification } from "@/components/elements";

const Content: FC = () => {
    const { isConnected } = useUserData();
    const { setnftsToTransfer, displayPaneMode, resetDisplayPane } = useStore();
    const isSupportedChain = useSuportedChains();

    const [collection, setCollection] = useState<CollectionExtended | undefined>(undefined);
    const [addressTotransfer, setAddressTotransfer] = useState<string>("");

    const getAddressFromTransfer = (value: SetStateAction<string>) => {
        setAddressTotransfer(value);
    };

    const onReset = () => {
        setnftsToTransfer([]);
        resetDisplayPane();
    };

    return (
        <>
            <div className="steps-pane">
                <StepsPane />
            </div>

            <div className="display-pane">
                <div className="pane">
                    {isConnected && isSupportedChain ? (
                        <>
                            {displayPaneMode === "start" && <StartPane />}
                            {displayPaneMode === "selectCollection" && (
                                <CollectionSelection setCollection={setCollection} />
                            )}
                            {displayPaneMode === "nfts" && collection && <NFTSelection collection={collection} />}
                            {displayPaneMode === "transfer" && (
                                <Transfer
                                    collectionAddress={collection?.token_address}
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
