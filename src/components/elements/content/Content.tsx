import { useState, FC, SetStateAction } from "react";

import { StepsPane, Verification } from "@/components/elements";
import { StartPane, CollectionSelection, NFTSelection, Transfer, Done } from "@/components/templates";
import { useUserData } from "@/context/UserContextProvider";
import { useSuportedChains } from "@/hooks";
import { useStore } from "@/store/store";

const Content: FC = () => {
    const { isConnected } = useUserData();
    const { displayPaneMode, reset } = useStore();
    const isSupportedChain = useSuportedChains();

    const [collection, setCollection] = useState<CollectionExtended | undefined>(undefined);
    const [addressTotransfer, setAddressTotransfer] = useState<string>("");

    const onReset = () => {
        reset();
        setCollection(undefined);
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
                                    address={addressTotransfer}
                                    setAddress={setAddressTotransfer}
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
