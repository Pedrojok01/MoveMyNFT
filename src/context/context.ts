"use client";
import { createContext } from "react";

const UserContext = createContext<UserContext>({
  chainId: 0,
  isConnected: false,
  fetchWeb3Data: () => {
    // do nothing
  },
});

export default UserContext;
