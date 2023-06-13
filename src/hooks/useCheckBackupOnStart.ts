import { useCallback } from "react";

import { useSwitchNetwork } from "wagmi";

import { useMongoDB } from "./useMongoDB";
import { useUserData } from "../context/UserContextProvider";
import { openNotification } from "../utils/notifications";

export const useCheckBackupOnStart = () => {
    const { address, chainId, setDisplayPaneMode } = useUserData();
    const { findBundle } = useMongoDB();
    const { switchNetwork } = useSwitchNetwork();

    const checkIfBackupOnStart = useCallback(async () => {
        const result = await findBundle(address as string);

        if (result) {
            const title = "Bundle Recovered";
            const msg = "You have an unsent bundle from your previous session. Finish your transfer to avoid any loss.";
            openNotification("info", title, msg);
            setDisplayPaneMode("transfer");
            if (chainId !== result.chainId && switchNetwork) {
                switchNetwork(result.chainId);
            }
            return {
                tokenId: result.tokenId,
                salt: result.salt,
                addresses: result.addresses,
                numbers: result.numbers,
            };
        } else return undefined;
    }, [address, chainId, findBundle, setDisplayPaneMode, switchNetwork]);

    return { checkIfBackupOnStart };
};
