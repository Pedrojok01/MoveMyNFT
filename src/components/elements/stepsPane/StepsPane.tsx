import { FC } from "react";

import { Steps } from "antd";

import { useWindowWidthAndHeight } from "@/hooks";
import { useStore } from "@/store/store";

import styles from "./StepsPane.module.css";

const StepsPane: FC = () => {
  const { displayPaneMode, nftsToTransfer } = useStore();
  const { isMobile, isSmallScreen } = useWindowWidthAndHeight();

  const switchStep = () => {
    switch (displayPaneMode) {
      case "start":
        return -1;
      case "selectCollection":
        return 0;
      case "nfts":
        return 1;
      case "transfer":
        return 2;
      case "done":
        return 3;
      default:
        return 0;
    }
  };

  const nfts = nftsToTransfer?.length;

  const items = [
    {
      title: isSmallScreen ? "Select Collection" : "Select the collection to transfer from",
      description:
        isSmallScreen && !isMobile
          ? ""
          : "Select the collection you wish to transfer some, or all NFTs from.",
    },
    {
      title: isSmallScreen ? "Select NFTs" : "Choose the NFTs to transfer",
      description:
        isSmallScreen && !isMobile
          ? ""
          : nfts > 0
            ? `${nfts} NFT${nfts > 1 ? "s" : ""} selected`
            : "Select some of your NFTs, or all, and click on OK when you're done.",
    },
    {
      title: "Approve & Transfer",
      description:
        isSmallScreen && !isMobile
          ? ""
          : "Batch transfer all your NFTs in your new wallet in one go!",
    },
  ];

  return (
    <div className={styles.steps}>
      <Steps
        direction={isSmallScreen ? "horizontal" : "vertical"}
        current={switchStep()}
        items={items}
        className={styles.stepsContent}
      />
    </div>
  );
};

export default StepsPane;
