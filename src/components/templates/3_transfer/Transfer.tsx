import { FC, useEffect, useState } from "react";

import { LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";

import { AddressInput } from "@/components/elements/addressInput";
import { useContractExecution } from "@/hooks";
import { useStore } from "@/store/store";

import styles from "./Transfer.module.css";

const Transfer: FC<TransferProps> = ({ collectionAddress, getAddressFromTransfer }) => {
    const { setDisplayPaneMode, nftsToTransfer, loading, error, setError } = useStore();
    const { approve, transfer } = useContractExecution();
    const [receiver, setReceiver] = useState<string | undefined>(undefined);
    const [buttonText, setButtonText] = useState<string>("APPROVE");

    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

    if (!collectionAddress) throw new Error("Collection address is missing");

    useEffect(() => {
        setError(null);
    }, []);

    const setAddress = (value: any) => {
        setReceiver(value);
        getAddressFromTransfer(value);
    };

    const handleTransfer = async () => {
        if (!receiver) {
            setError("Please enter a valid address");
            return;
        }

        const approved = await approve(collectionAddress);

        if (approved) {
            setButtonText("TRANSFER");
            await transfer(
                collectionAddress,
                nftsToTransfer[0].contract_type,
                receiver,
                nftsToTransfer.map((nft) => nft.token_id),
                nftsToTransfer[0].contract_type === "ERC1155"
                    ? nftsToTransfer.map((nft) => Number(nft.amount))
                    : undefined
            );
        }
    };

    const onBackClick = () => {
        setDisplayPaneMode("nfts");
    };

    return (
        <Spin spinning={loading} indicator={antIcon} size="large">
            <div className={styles.content}>
                <div style={{ margin: "auto", width: "80%" }}>
                    <p className={styles.text}>Transfer my NFTs</p>
                    <AddressInput autoFocus placeholder="Receiver" address={receiver ?? ""} setAddress={setAddress} />

                    {error && <p className="error-text">{error}</p>}

                    <div className={styles.buttonDiv}>
                        <Button
                            className={`button-small black ${styles.backButton}`}
                            shape="round"
                            onClick={onBackClick}
                        >
                            back
                        </Button>
                        <Button className={styles.transferButton} shape="round" onClick={handleTransfer}>
                            {buttonText} <SendOutlined style={{ padding: "0 20px", fontSize: "18px" }} />
                        </Button>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default Transfer;
