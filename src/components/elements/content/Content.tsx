import { useState, FC } from "react";

import { StepsPane, Verification } from "@/components/elements";
import {
  StartPane,
  CollectionSelection,
  NFTSelection,
  Transfer,
  Done,
} from "@/components/templates";
import { useUserData } from "@/context/UserContextProvider";
import { useSuportedChains } from "@/hooks";
import { useStore } from "@/store/store";

const Content: FC = () => {
  const { isConnected } = useUserData();
  const { displayPaneMode, reset } = useStore();
  const isSupportedChain = useSuportedChains();

  const [collection, setCollection] = useState<CollectionExtended | undefined>(undefined);
  const [addressTotransfer, setAddressTotransfer] = useState<string>("");

  const onReset = () => {
    reset();
    setCollection(undefined);
  };

  const renderPane = () => {
    if (!isConnected || !isSupportedChain) {
      return <Verification />;
    }

    switch (displayPaneMode) {
      case "start":
        return <StartPane />;
      case "selectCollection":
        return <CollectionSelection setCollection={setCollection} />;
      case "nfts":
        return collection && <NFTSelection collection={collection} />;
      case "transfer":
        return (
          collection && (
            <Transfer
              collectionAddress={collection.token_address}
              address={addressTotransfer}
              setAddress={setAddressTotransfer}
            />
          )
        );
      case "done":
        return <Done address={addressTotransfer} onReset={onReset} />;
      default:
        return <StartPane />;
    }
  };

  return (
    <>
      <div className="steps-pane">
        <StepsPane />
      </div>

      <div className="display-pane">
        <div className="pane">{renderPane()}</div>
      </div>
    </>
  );
};

export default Content;
