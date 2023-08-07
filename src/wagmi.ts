import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import {
  mainnet,
  goerli,
  polygon,
  polygonMumbai,
  bsc,
  bscTestnet,
  fantom,
  optimism,
  optimismGoerli,
  fantomTestnet,
  arbitrum,
  arbitrumGoerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { isProdEnv } from "./data/constant";

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!alchemyApiKey || !projectId) {
  throw new Error("Some ENV variables are not defined");
}

export const { chains, publicClient } = configureChains(
  [
    ...(isProdEnv
      ? [mainnet, optimism, polygon, arbitrum, fantom, bsc]
      : [goerli, optimismGoerli, polygonMumbai, arbitrumGoerli, fantomTestnet, bscTestnet]),
  ],
  [alchemyProvider({ apiKey: alchemyApiKey }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "MoveMyNFT",
  projectId: projectId,
  chains: chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
