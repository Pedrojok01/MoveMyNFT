import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import { Alert, Button } from "antd";

import styles from "./NFTSelection.module.css";
import { useUserData } from "../../../context/UserContextProvider";
import { useSpamFilter } from "../../../hooks";
import { CollectionSelector, DisplayNFT } from "../../elements";

const NFTSelection: FC<NFTProps> = ({ NFTsToTransfer, setNFTsToTransfer }) => {
    const { userNFTs, setDisplayPaneMode } = useUserData();
    const { nfts } = useSpamFilter();
    const [nftsDisplayed, setNftsDisplayed] = useState<NFTinDB[]>([]);
    const [selectedNFTs, setSelectedNFTs] = useState(NFTsToTransfer ?? []);

    useEffect(() => {
        setNftsDisplayed(nfts?.nfts);
    }, [nfts]);

    const isNFTSelected = useCallback(
        (currentNft: NFTinDB) =>
            selectedNFTs.some(
                (nft) => currentNft.token_id === nft.token_id && currentNft.token_address === nft.token_address
            ),
        [selectedNFTs]
    );

    const handleClickCard = useCallback(
        (clickedNFT: NFTinDB) => {
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
        [isNFTSelected]
    );

    const onSelectAllNFTs = useCallback(() => {
        setSelectedNFTs((prev) => (prev.length < nftsDisplayed?.length ? nftsDisplayed : []));
    }, [nftsDisplayed]);

    const selectButtonText = useMemo(() => {
        return selectedNFTs.length < nftsDisplayed?.length ? "Select All" : "Deselect All";
    }, [selectedNFTs, nftsDisplayed]);

    const onValidateNFTSelection = () => {
        setNFTsToTransfer(selectedNFTs);
        setDisplayPaneMode("bundle");
    };

    const onBackClick = () => {
        setDisplayPaneMode("tokens");
    };

    const UserAlerts: FC<{ total: number }> = ({ total }) => {
        const alertMessage =
            "Approving a smart-contract comes with risks. We make our best to filter all scam NFTs, but some might still be left behind. Make sure not to approve any undesired NFTs.";

        if (total > 0) {
            return <Alert type="warning" closable={true} showIcon message={alertMessage} />;
        }

        if (total === 0) {
            return <Alert type="info" showIcon message={"No NFTs found on this account"} />;
        }

        return null;
    };

    return (
        <div className="pane-content">
            <div className={styles.title}>
                <p className={styles.text}>Select NFTs to transfer or</p>
                <div className={styles.selector}>
                    <CollectionSelector setNftsDisplayed={setNftsDisplayed} />
                </div>
            </div>
            <UserAlerts total={userNFTs?.total} />

            <div className={styles.NFTs} style={{ overflowY: "scroll" }}>
                {nftsDisplayed?.map((nft, index) => {
                    return (
                        <DisplayNFT
                            key={`${nft.token_id}-${nft.token_address}`}
                            item={nft}
                            index={index}
                            isNFTSelected={isNFTSelected}
                            handleClickCard={handleClickCard}
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
