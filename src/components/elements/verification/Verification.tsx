import { FC } from "react";

import { useUserData } from "@/context/UserContextProvider";
import { useSuportedChains } from "@/hooks";

import styles from "./Verification.module.css";

const notConnected = "Connect your wallet to get started";
const unupportedChain = `This chain is not supported, \n
    please select a different chain`;

const Verification: FC = () => {
  const { isConnected } = useUserData();
  const isSupportedChain = useSuportedChains();

  let message = "";
  if (!isConnected) {
    message = notConnected;
  } else if (!isSupportedChain) {
    message = unupportedChain;
  }

  return (
    <>
      {message !== "" && (
        <div className="small-pane">
          <div className={styles.smallContainer}>
            <div className={styles.text}>{message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Verification;
