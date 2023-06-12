import { FC, useMemo, useState } from "react";

import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

import styles from "./CollectionSelector.module.css";
import { useUserData } from "../../../context/UserContextProvider";
import { useFetchCollectionNFTs, useIPFS } from "../../../hooks";

const CollectionSelector: FC<CollectionSelectorProps> = ({ setNftsDisplayed }) => {
    const { address, chainId, collections, userNFTs } = useUserData();
    const { resolveLink } = useIPFS();
    const { fetchNFTs } = useFetchCollectionNFTs();

    const [selected, setSelected] = useState<MenuItem>();
    const [label, setLabel] = useState<JSX.Element>();

    const dropdownItems = useMemo(
        () =>
            collections?.map((item) => {
                return {
                    label: item.name,
                    key: item.token_address.toLowerCase(),
                    icon: IconToShow(item.token_address, userNFTs, resolveLink),
                };
            }),
        [collections, userNFTs, resolveLink]
    );

    const items: Item[] = dropdownItems;

    const onClick: MenuProps["onClick"] = async ({ key }) => {
        const selectedItem = items.find((item) => item.key === key);
        setSelected(selectedItem);
        setLabel(selectedItem?.icon);

        const data = await fetchNFTs(address as string, chainId, key);
        setNftsDisplayed(data);
    };

    return (
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
            <Button className={styles.button}>
                {!selected ? (
                    <span className={styles.selectorTitle}>Select Collections</span>
                ) : (
                    <div className={styles.collectionItem}>
                        <span className={styles.collectionLogo}>{label}</span>
                        <span className={styles.collectionName}>{selected?.label}</span>
                    </div>
                )}
                <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default CollectionSelector;

export function IconToShow(collec: string, userNFTs: Nfts, resolveLink: (nft: NFTinDB) => NFTinDB) {
    const randomNft = userNFTs?.nfts.find((item) => item.token_address.toLowerCase() === collec.toLowerCase());
    if (randomNft) {
        const nft = resolveLink(randomNft);
        return <img className={styles.thumbnail} src={nft.image} alt={nft.name ?? "nft_image"} />;
    } else return <>Loading...</>;
}
