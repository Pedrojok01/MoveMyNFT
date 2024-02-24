import { useEffect, useState } from "react";

import { useAccount, useEnsName } from "wagmi";

export const useAddressOrENS = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const [account, setAccount] = useState<string>("");

  useEffect(() => {
    if (address === undefined || address === null) {
      setAccount("");
    } else if (ensName) {
      setAccount(ensName);
    } else {
      setAccount(address);
    }
  }, [address, ensName]);

  return account;
};
