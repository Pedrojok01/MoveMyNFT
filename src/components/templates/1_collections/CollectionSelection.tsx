import { FC, useCallback, useEffect } from "react";

import { Alert, Button, Spin } from "antd";

import { DisplayNFT } from "@/components/elements";
import { useStore } from "@/store/store";

import styles from "./CollectionSelection.module.css";

const CollectionSelection: FC<CollectionSelectionProps> = ({ setCollection }) => {
  const { setDisplayPaneMode, collections, setNftsToTransfer, loading } = useStore();

  useEffect(() => {
    setNftsToTransfer([]);
  }, [setNftsToTransfer]);

  const handleClickCard = useCallback(
    (card: CollectionExtended) => {
      setCollection(card);
      setDisplayPaneMode("nfts");
    },
    [setCollection, setDisplayPaneMode]
  );

  const onBackClick = useCallback(() => {
    setDisplayPaneMode("start");
  }, [setDisplayPaneMode]);

  return (
    <div className="pane-content">
      <p className={styles.text}>Select NFTs collection to transfer from</p>

      {loading ? (
        <Spin tip="Loading" size="large">
          <div className={styles.NFTs} style={{ overflowY: "hidden" }}></div>
        </Spin>
      ) : (
        <div className={styles.NFTs} style={{ overflowY: "auto" }}>
          <UserAlerts total={collections?.length} />
          {collections?.map((collection) => {
            return (
              <DisplayNFT
                key={collection.uuid}
                item={collection}
                index={Number(collection.uuid)}
                isNFTSelected={() => false}
                handleClickCard={() => handleClickCard(collection)}
              />
            );
          })}
        </div>
      )}

      <div className="button-align-right">
        <Button
          className="button-small black"
          style={{ float: "left", marginLeft: "50px" }}
          shape="round"
          onClick={onBackClick}
        >
          back
        </Button>
      </div>
    </div>
  );
};

export default CollectionSelection;

export const UserAlerts: FC<{ total: number }> = ({ total }) => {
  if (total === 0) {
    return <Alert type="info" showIcon message={"No NFTs found on this account."} />;
  }

  return null;
};
