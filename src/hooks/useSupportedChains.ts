import { useMemo } from "react";

import { useAccount } from "wagmi";

import { isProdEnv, SUPPORTED_CHAIN } from "../data/constant";

export function useSuportedChains() {
  const { chain } = useAccount();

  return useMemo(() => {
    if (!chain) {
      return false;
    }

    const supportedChains = isProdEnv ? SUPPORTED_CHAIN.mainnet : SUPPORTED_CHAIN.testnet;
    return supportedChains.includes(chain.id);
  }, [chain]);
}
