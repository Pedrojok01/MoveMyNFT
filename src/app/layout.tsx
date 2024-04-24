import { ReactNode } from "react";

import type { Metadata } from "next";

import { Providers } from "./providers";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

export const metadata: Metadata = {
  title: "Move My NFTs",
  description:
    "Batch Transfer NFTs - The easiest and fastest way to transfer some, or all your NFTs from one collection between addresses. ",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Sora, sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
