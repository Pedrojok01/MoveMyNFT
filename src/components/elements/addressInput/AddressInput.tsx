import React, { FC, useEffect, useRef } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Input, InputRef } from "antd";
import { isAddress } from "viem";

import { useAddressInput } from "@/hooks";

import { Cross } from "./Cross";
import Jazzicons from "./Jazzicons";

const AddressInput: FC<{
  placeholder?: string;
  autoFocus?: boolean;
  address: string;
  setAddress: (address: string) => void;
}> = ({ placeholder, autoFocus, address, setAddress }) => {
  const inputRef = useRef<InputRef>(null);
  const { isDomain, userInput, resolvedAddress, error, updateAddress } = useAddressInput(address);

  useEffect(() => {
    setAddress(resolvedAddress);
  }, [resolvedAddress, setAddress]);

  return (
    <>
      <Input
        ref={inputRef}
        placeholder={placeholder || "Public address"}
        prefix={
          isDomain(userInput) || isAddress(userInput) ? (
            <Jazzicons seed={userInput.toLowerCase()} />
          ) : (
            <SearchOutlined />
          )
        }
        suffix={<Cross onClick={() => updateAddress("")} />}
        autoFocus={autoFocus}
        value={userInput}
        onChange={(e) => updateAddress(e.target.value)}
        style={{ backgroundColor: "white", gap: "0.5rem" }}
      />
      {error && <p className="error-text">{error}</p>}
    </>
  );
};

export default AddressInput;
