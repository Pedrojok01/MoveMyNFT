import { useEffect, useState, useCallback } from "react";

import { isAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsResolver } from "wagmi";

export const useAddressInput = (initialAddress = "") => {
  const [userInput, setUserInput] = useState(initialAddress);
  const [resolvedAddress, setResolvedAddress] = useState("");
  const [error, setError] = useState("");

  // Determine if the user input is an ENS domain
  const isDomain = useCallback((input: string) => {
    return input.endsWith(".eth") || input.endsWith(".xyz");
  }, []);

  // Resolve ENS name
  const { data: ensResolvedAddress } = useEnsResolver({ name: userInput, chainId: 1 });

  useEffect(() => {
    if (isDomain(userInput)) {
      if (ensResolvedAddress) {
        setResolvedAddress(normalize(ensResolvedAddress));
        setError("");
      } else {
        setError("Error fetching ENS address");
      }
    } else if (isAddress(userInput)) {
      setResolvedAddress(userInput);
      setError("");
    } else if (userInput !== "") {
      setError("Invalid address. Please check your input.");
    } else {
      setError("");
    }
  }, [userInput, ensResolvedAddress, isDomain]);

  const updateAddress = useCallback((value: string) => {
    setUserInput(value);
  }, []);

  return { isDomain, userInput, resolvedAddress, error, updateAddress };
};
