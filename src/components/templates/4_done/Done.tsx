import { FC } from "react";

import { Button, Divider } from "antd";

import styles from "./Done.module.css";
import { useStore } from "@/store/store";
import { useWindowWidthAndHeight } from "@/hooks";
import { getEllipsisTxt } from "@/utils/format";

const Done: FC<DoneProps> = ({ address, onReset }) => {
    const { nftsToTransfer } = useStore();
    const { isMobile } = useWindowWidthAndHeight();

    const addressToShow = isMobile ? getEllipsisTxt(address, 8) : address;

    return (
        <div className="small-pane">
            <p className={styles.title}>Done !</p>
            <p className={styles.text}>
                <span>{nftsToTransfer.length} NFTs have been succesfully transferred to: </span>
                <span style={{ fontWeight: "600", color: "blue" }}>{addressToShow}</span>.
            </p>

            <p className={styles.text}>Thank you for using Move My NFT!</p>

            <Divider style={{ marginBlock: "40px" }} />

            <p className={styles.subtext}>
                <a href={"https://github.com/Pedrojok01/MoveMyNFT"} target="_blank" rel="noreferrer noopener">
                    This code is free to use and open source. Leave a ⭐️ on Github if you like it!
                </a>
            </p>

            <Divider style={{ marginBlock: "40px" }} />

            <Button className={styles.resetButton} shape="round" onClick={onReset}>
                Restart
            </Button>
        </div>
    );
};

export default Done;
