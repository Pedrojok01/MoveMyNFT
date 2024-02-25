import { CSSProperties, FC, useMemo } from "react";

import { Card } from "antd";
import Image from "next/image";

import { useIPFS, useWindowWidthAndHeight } from "@/hooks";

const { Meta } = Card;

const getCardStyle = (isSmallScreen: boolean, isSelected: boolean): CSSProperties => ({
  width: isSmallScreen ? 150 : 190,
  height: isSmallScreen ? 215 : 275,
  border: isSelected ? "8px solid #e7e779" : undefined,
  opacity: isSelected ? "1" : "0.9",
  transform: isSelected ? undefined : "scale(0.9)",
});

const DisplayNFT: FC<DisplayNFTProps> = ({ item, index, isNFTSelected, handleClickCard }) => {
  const { isSmallScreen } = useWindowWidthAndHeight();
  const { resolveLink } = useIPFS();
  const nft = useMemo(() => resolveLink(item), [item, resolveLink]);
  const isSelected = isNFTSelected(nft);

  const isVideo = nft?.image?.match(/\.(mp4|webm|ogg)$/);

  return (
    <Card
      onClick={() => handleClickCard(nft)}
      size="small"
      hoverable
      style={getCardStyle(isSmallScreen, isSelected)}
      cover={
        isVideo ? (
          <video
            src={nft?.image}
            autoPlay
            loop
            muted
            height={isSmallScreen ? 150 : 190}
            width={isSmallScreen ? 130 : 180}
            style={{ borderRadius: "8px 8px 0 0" }}
          />
        ) : (
          <Image
            src={nft.image}
            alt="NFT image"
            height={isSmallScreen ? 150 : 190}
            width={isSmallScreen ? 130 : 180}
          />
        )
      }
      key={index}
    >
      <Meta title={nft?.name} description={nft?.contract_type} />
    </Card>
  );
};

export default DisplayNFT;
