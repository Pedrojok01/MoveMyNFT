import { createContext } from "react";

const UserContext = createContext<UserContext>({
    chainId: 0,
    isConnected: false,
    balances: { native: "0", token: [] },
    userNFTs: { nfts: [], total: 0 },
    collections: [],
    // eslint-disable-next-line
    fetchWeb3Data: () => {},
    displayPaneMode: "start",
    // eslint-disable-next-line
    setDisplayPaneMode: () => {},
    // eslint-disable-next-line
    resetDisplayPane: () => {},
    loading: false,
    error: null,
});

export default UserContext;
