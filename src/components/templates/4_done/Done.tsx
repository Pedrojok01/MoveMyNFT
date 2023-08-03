import { FC } from "react";

import { Button, Divider } from "antd";

import styles from "./Done.module.css";

const Done: FC<DoneProps> = ({ address, onReset }) => {
    return (
        <div className="small-pane">
            <p className={styles.title}>Done !</p>
            <p className={styles.text}>
                Your assets have been succesfully transferred to:<br></br>
                <span style={{ fontWeight: "600", color: "blue" }}>{address}</span>.<br></br>
            </p>
            <p className={styles.text}>Thank you for using Move My NFT!</p>
            <p className={styles.text}>
                The code is open source. You can find it on:{" "}
                <a href={"https://github.com/Pedrojok01/MoveMyNFT"} target="_blank" rel="noreferrer noopener">
                    Github
                </a>
                .
            </p>
            <Divider style={{ marginBlock: "40px" }} />
            <Button className={styles.resetButton} shape="round" onClick={onReset}>
                Restart
            </Button>
        </div>
    );
};

export default Done;