"use client";
import { FC } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Layout } from "antd";
import Image from "next/image";
import Link from "next/link";

import movemynft_logo_transparent from "/public/images/movemynft_logo_transparent.png";

import { useWindowWidthAndHeight } from "@/hooks";
import { useStore } from "@/store/store";

import styles from "./HeaderPage.module.css";

const { Header } = Layout;

const HeaderPage: FC = () => {
  const { setDisplayPaneMode } = useStore();
  const { isMobile } = useWindowWidthAndHeight();

  const handleClick = () => {
    setDisplayPaneMode("start");
  };

  return (
    <Header className={styles.header}>
      <Link href="/" onClick={handleClick} className={styles.logoDiv}>
        <Logo /> {!isMobile && <h1 className={styles.title}>Move My NFT</h1>}
      </Link>

      <div className={styles.headerRight}>
        <ConnectButton />
      </div>
    </Header>
  );
};

export const Logo: FC = () => {
  return (
    <Image
      src={movemynft_logo_transparent.src}
      alt="movemynft_logo_transparent"
      className={styles.logo}
      width={500}
      height={500}
    />
  );
};

export default HeaderPage;
