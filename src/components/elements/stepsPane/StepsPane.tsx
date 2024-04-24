import { FC } from "react";

import { Steps } from "antd";

import { useWindowWidthAndHeight } from "@/hooks";
import { useStore } from "@/store/store";

import styles from "./StepsPane.module.css";

const getStep = (displayPaneMode: string) => {
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

function getDescription(isSmallScreen: boolean, isMobile: boolean, nfts = 0) {
  if (isSmallScreen && !isMobile) {
    return "";
  }

  switch (nfts) {
    case 0:
      return "Select some of your NFTs, or all, and click on OK when you're done.";
    default:
      return `${nfts} NFT${nfts > 1 ? "s" : ""} selected`;
  }
}

const StepsPane: FC = () => {
  const { displayPaneMode, nftsToTransfer } = useStore();
  const { isMobile, isSmallScreen } = useWindowWidthAndHeight();

  const nfts = nftsToTransfer?.length || 0;

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
      description: getDescription(isSmallScreen, isMobile, nfts),
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
        current={getStep(displayPaneMode)}
        items={items}
        className={styles.stepsContent}
      />
    </div>
  );
};

export default StepsPane;
