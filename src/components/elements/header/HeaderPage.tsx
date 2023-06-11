import { FC } from "react";

import { Layout } from "antd";
import Link from "next/link";

import styles from "./HeaderPage.module.css";

import movemynft_logo_transparent from "/public/images/movemynft_logo_transparent.png";
import movemynft_logo_transparent_small from "/public/android-chrome-192x192.png";

import { useWindowWidthAndHeight } from "../../../hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const { Header } = Layout;

const HeaderPage: FC = () => {
    return (
        <Header className={styles.header}>
            <Link href="/">
                <Logo />
            </Link>

            <div className={styles.headerRight}>
                <ConnectButton />
            </div>
        </Header>
    );
};

export const Logo = () => {
    const { isMobileOnly } = useWindowWidthAndHeight();
    return (
        <img
            src={isMobileOnly ? movemynft_logo_transparent_small.src : movemynft_logo_transparent.src}
            alt="movemynft_logo_transparent"
            className={styles.logo}
        />
    );
};

export default HeaderPage;
