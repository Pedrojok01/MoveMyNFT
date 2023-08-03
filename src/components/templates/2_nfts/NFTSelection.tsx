import React, { FC, useCallback, useMemo, useState } from "react";

import { Button } from "antd";

import { DisplayNFT } from "@/components/elements";
import { useStore } from "@/store/store";

import styles from "./NFTSelection.module.css";

const NFTSelection: FC<NFTSelectionProps> = ({ collection }) => {
    const { setDisplayPaneMode, nftsToTransfer, setNftsToTransfer } = useStore();
    const [selectedNFTs, setSelectedNFTs] = useState<Nft[]>(nftsToTransfer ?? []);

    const isNFTSelected = useCallback(
        (currentNft: Nft) =>
            selectedNFTs.some(
                (nft) =>
                    currentNft.token_id === nft.token_id &&
                    currentNft.token_address.toLowerCase() === nft.token_address.toLowerCase()
            ),
        [selectedNFTs]
    );

    const handleClickCard = useCallback(
        (clickedNFT: Nft) => {
            if (isNFTSelected(clickedNFT)) {
                setSelectedNFTs(
                    selectedNFTs.filter(
                        (nft) => clickedNFT.token_id !== nft.token_id || clickedNFT.token_address !== nft.token_address
                    )
                );
            } else {
                setSelectedNFTs((prev) => [...prev, clickedNFT]);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isNFTSelected]
    );

    const onSelectAllNFTs = useCallback(() => {
        setSelectedNFTs((prev) => (prev.length < collection.nfts?.length ? collection.nfts : []));
    }, [collection.nfts]);

    const selectButtonText = useMemo(() => {
        return selectedNFTs.length < collection.nfts?.length ? "Select All" : "Deselect All";
    }, [selectedNFTs, collection.nfts]);

    const onValidateNFTSelection = () => {
        setNftsToTransfer(selectedNFTs);
        setDisplayPaneMode("transfer");
    };

    const onBackClick = () => {
        setDisplayPaneMode("selectCollection");
    };

    return (
        <div className="pane-content">
            <div className={styles.title}>
                <p className={styles.text}>Select the NFTs to transfer</p>
            </div>

            <div className={styles.NFTs} style={{ overflowY: collection.nfts?.length > 3 ? "scroll" : "hidden" }}>
                {collection.nfts.map((nft, index) => {
                    nft.image = nft.normalized_metadata.image;
                    return (
                        <DisplayNFT
                            key={`${nft.token_id}-${nft.token_address}`}
                            item={nft}
                            index={index}
                            isNFTSelected={() => isNFTSelected(nft)}
                            handleClickCard={() => handleClickCard(nft)}
                        />
                    );
                })}
            </div>

            <div className="button-align-right">
                <Button
                    className="button-small black"
                    style={{ float: "left", marginLeft: "50px" }}
                    shape="round"
                    onClick={onBackClick}
                >
                    Back
                </Button>
                <Button className="button-small black" shape="round" onClick={onSelectAllNFTs}>
                    {selectButtonText}
                </Button>
                <Button className="button-small black" shape="round" onClick={onValidateNFTSelection}>
                    OK
                </Button>
            </div>
        </div>
    );
};

export default NFTSelection;
