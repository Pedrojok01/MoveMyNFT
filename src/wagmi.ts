import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Transport } from "viem";
import { createConfig, http } from "wagmi";
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

import { isProdEnv } from "./data/constant";
import fantomLogo from "../public/images/fantom-ftm-logo.png";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error("WalletConnect Project ID is not defined");
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Other",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
        ledgerWallet,
        rabbyWallet,
        coinbaseWallet,
        argentWallet,
        safeWallet,
      ],
    },
  ],
  { appName: "MoveMyNFT", projectId: projectId }
);

const customFantom = { ...fantom, iconUrl: fantomLogo.src };
const customfantomTestnet = { ...fantomTestnet, iconUrl: fantomLogo.src };

const transports: Record<number, Transport> = isProdEnv
  ? {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [arbitrum.id]: http(),
      [fantom.id]: http(),
      [bsc.id]: http(),
    }
  : {
      [goerli.id]: http(),
      [polygonMumbai.id]: http(),
      [optimismGoerli.id]: http(),
      [arbitrumGoerli.id]: http(),
      [fantomTestnet.id]: http(),
      [bscTestnet.id]: http(),
    };

export const wagmiConfig = createConfig({
  chains: isProdEnv
    ? [mainnet, polygon, optimism, arbitrum, customFantom, bsc]
    : [goerli, polygonMumbai, optimismGoerli, arbitrumGoerli, customfantomTestnet, bscTestnet],
  connectors,
  transports,
  ssr: true,
});
