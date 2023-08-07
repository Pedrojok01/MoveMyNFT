import { FC } from "react";

import { Button } from "antd";

import { useStore } from "@/store/store";

import styles from "./StartPane.module.css";

const StartPane: FC = () => {
  const { setDisplayPaneMode } = useStore();

  return (
    <div className={styles.startPane}>
      <p className={styles.text}>
        Welcome to<br></br> <span style={{ fontSize: "60px" }}>Move My NFT</span>
      </p>
      <div className={styles.buttonDiv}>
        <Button
          className="button-black-big"
          shape="round"
          onClick={() => setDisplayPaneMode("selectCollection")}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default StartPane;
