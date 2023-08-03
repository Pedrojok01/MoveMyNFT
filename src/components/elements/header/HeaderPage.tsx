import { FC } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Layout } from "antd";
import Link from "next/link";

import movemynft_logo_transparent from "/public/images/movemynft_logo_transparent.png";
import movemynft_logo_transparent_small from "/public/images/movemynft_logo_square_transparent.png";

import { useWindowWidthAndHeight } from "@/hooks";
import { useStore } from "@/store/store";

import styles from "./HeaderPage.module.css";

const { Header } = Layout;

const HeaderPage: FC = () => {
    const { setDisplayPaneMode } = useStore();

    const handleClick = () => {
        setDisplayPaneMode("start");
    };

    return (
        <Header className={styles.header}>
            <Link href="/">
                <div onClick={handleClick}>
                    <Logo />
                </div>
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
