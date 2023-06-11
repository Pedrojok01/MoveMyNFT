import React, { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import NextHead from "next/head";
import { WagmiConfig } from "wagmi";

import { UserDataProvider } from "../context/UserContextProvider";
import { chains, wagmiConfig } from "../wagmi";
import "../styles/globals.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

function App({ Component, pageProps }: AppProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                <UserDataProvider>
                    <NextHead>
                        <title>Move My wallet</title>
                    </NextHead>
                    <div style={{ fontFamily: "Sora, sans-serif" }}>{mounted && <Component {...pageProps} />}</div>
                </UserDataProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default App;
