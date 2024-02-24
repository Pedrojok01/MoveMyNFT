"use client";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

import RootLayout from "./layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
      <Analytics />
    </RootLayout>
  );
}

export default App;
