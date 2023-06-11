import React, { useCallback, useEffect, useRef, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Input, InputRef } from "antd";
import { useEnsResolver } from "wagmi";

import Jazzicons from "./Jazzicons";
import { useUserData } from "../../../context/UserContextProvider";
import { isAddress } from "viem";

const AddressInput: React.FC<{
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
        enabled: isDomain && isSupportedENSNetwork,
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

    useEffect(() => {
        if (resolvedAddress && isDomain) {
            setAddress(resolvedAddress);
            setUserInput(resolvedAddress);
        }
    }, [resolvedAddress, setAddress, isDomain]);

    const displayError = error || (isResolverError ? "Error fetching ENS address" : null);

    const Cross = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 22 22"
            strokeWidth="2"
            stroke="#E33132"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => {
                setAddress("");
                setUserInput("");
                if (input.current !== null) {
                    input.current.focus();
                }
            }}
            style={{ cursor: "pointer" }}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );

    return (
        <>
            <Input
                ref={input}
                placeholder={placeholder || "Public address"}
                prefix={
                    isDomain || isAddress(userInput) ? <Jazzicons seed={userInput.toLowerCase()} /> : <SearchOutlined />
                }
                suffix={isAddress(userInput) && <Cross />}
                autoFocus={autoFocus}
                value={isAddress(userInput) ? userInput : userInput}
                onChange={(e) => {
                    updateAddress(e.target.value);
                }}
                disabled={isAddress(userInput)}
                style={{ backgroundColor: "white", gap: "0.5rem" }}
            />
            {displayError && (
                <p style={{ color: "red", marginBlock: "15px", fontSize: "12px", backgroundColor: "white" }}>
                    {displayError}
                </p>
            )}
        </>
    );
};

export default AddressInput;
