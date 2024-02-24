import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Input, InputRef } from "antd";
import { isAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsResolver } from "wagmi";

import { useUserData } from "@/context/UserContextProvider";

import Jazzicons from "./Jazzicons";
import { Cross } from "./Cross";

const AddressInput: FC<{
  placeholder?: string;
  autoFocus?: boolean;
  address: string;
  setAddress: (address: string) => void;
}> = ({ placeholder, autoFocus, address, setAddress }) => {
  const input = useRef<InputRef>(null);
  const { chainId } = useUserData();
  const [userInput, setUserInput] = useState<string>(address || "");
  const [error, setError] = useState<string | null>(null);

  const isDomain = userInput.endsWith(".eth") || userInput.endsWith(".xyz");
  const isSupportedENSNetwork = chainId === 1;

  const { data: resolvedAddress, isError: isResolverError } = useEnsResolver({
    name: userInput,
    chainId: 1,
  });

  const updateAddress = useCallback(
    (value: string) => {
      setUserInput(value);
      if (value !== "" && !isAddress(value) && !isDomain) {
        setError("Invalid address. Please check your input.");
      } else {
        setError(null);
        setAddress(value);
      }
    },
    [setAddress, isDomain]
  );

  const handleCrossClick = useCallback(() => {
    setAddress("");
    setUserInput("");
    if (input.current !== null) {
      input.current.focus();
    }
  }, [setAddress]);

  const CrossMemo = useMemo(() => <Cross onClick={handleCrossClick} />, [handleCrossClick]);

  useEffect(() => {
    if (resolvedAddress && isDomain && isSupportedENSNetwork) {
      setAddress(resolvedAddress);
      setUserInput(normalize(resolvedAddress));
    }
  }, [resolvedAddress, isSupportedENSNetwork, setAddress, isDomain]);

  const displayError = error || (isResolverError ? "Error fetching ENS address" : null);

  return (
    <>
      <Input
        ref={input}
        placeholder={placeholder || "Public address"}
        prefix={
          isDomain || isAddress(userInput) ? (
            <Jazzicons seed={userInput.toLowerCase()} />
          ) : (
            <SearchOutlined />
          )
        }
        suffix={isAddress(userInput) && CrossMemo}
        autoFocus={autoFocus}
        value={isAddress(userInput) ? userInput : userInput}
        onChange={(e) => {
          updateAddress(e.target.value);
        }}
        disabled={isAddress(userInput)}
        style={{ backgroundColor: "white", gap: "0.5rem" }}
      />
      {displayError && <p className="error-text">{displayError}</p>}
    </>
  );
};

export default AddressInput;
