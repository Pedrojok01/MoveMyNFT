import { FC, useState } from "react";

import { LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";

import styles from "./Transfer.module.css";
import { useContractExecution } from "@/hooks";
import { AddressInput } from "@/components/elements/addressInput";
import { useStore } from "@/store/store";

const Transfer: FC<TransferProps> = ({ collectionAddress, NFTsToTransfer, getAddressFromTransfer }) => {
    const { setDisplayPaneMode, loading, error } = useStore();
    const { transfer } = useContractExecution();
    const [receiver, setReceiver] = useState<string>("");

    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

    if (!collectionAddress) throw new Error("Collection address is missing");

    const setAddress = (value: any) => {
        setReceiver(value);
        getAddressFromTransfer(value);
    };

    const handleTransfer = async () => {
        await transfer(
            collectionAddress,
            NFTsToTransfer[0].contract_type,
            receiver,
            NFTsToTransfer.map((nft) => nft.token_id)
        );
    };

    const onBackClick = () => {
        setDisplayPaneMode("nfts");
    };

    return (
        <Spin spinning={loading} indicator={antIcon} size="large">
            <div className={styles.content}>
                <div style={{ margin: "auto", width: "80%" }}>
                    <p className={styles.text}>Transfer my assets</p>
                    <AddressInput autoFocus placeholder="Receiver" address={receiver} setAddress={setAddress} />
                    <div className={styles.buttonDiv}>
                        <Button
                            className={`button-small black ${styles.backButton}`}
                            shape="round"
                            onClick={onBackClick}
                        >
                            back
                        </Button>
                        <Button className={styles.transferButton} shape="round" onClick={handleTransfer}>
                            TRANSFER <SendOutlined style={{ padding: "0 20px", fontSize: "18px" }} />
                        </Button>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default Transfer;
