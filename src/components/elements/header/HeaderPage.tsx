import { FC } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Layout } from "antd";
import Link from "next/link";

import styles from "./HeaderPage.module.css";

import movemynft_logo_transparent from "/public/images/movemynft_logo_transparent.png";
import movemynft_logo_transparent_small from "/public/images/movemynft_logo_square_transparent.png";

import { useWindowWidthAndHeight } from "../../../hooks";

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
