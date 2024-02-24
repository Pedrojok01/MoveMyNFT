"use client";
import { ReactNode, useEffect, useState } from "react";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import { UserDataProvider } from "@/context/UserContextProvider";
import { wagmiConfig } from "@/wagmi";

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const queryClient = new QueryClient();

  const appInfo = {
    appName: "Move My NFT",
  };

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <UserDataProvider>
          <RainbowKitProvider appInfo={appInfo}>{mounted && children}</RainbowKitProvider>
        </UserDataProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
