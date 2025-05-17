"use client";

import type { Account } from "@/features/accounts/types";
import { detectAddressNetwork } from "@/lib/detectAddressNetwork";
import { useCallback, useContext } from "react";
import { AccountsContext } from "./AccountsContext";

export const useAccount = (index: number = 0) => {
  const { accounts, setAccounts } = useContext(AccountsContext);

  const account = accounts[index];

  const setAccount = useCallback(
    (account: Account) => {
      setAccounts((current) => {
        const next = [...current];
        next[index] = account;
        return next;
      });
    },
    [index, setAccounts]
  );

  const setAddress = useCallback(
    (address: string) => {
      const network = detectAddressNetwork(address);

      if (network) {
        return setAccount({
          ...account,
          [network]: address,
        });
      }

      throw new Error("Network not detected");
    },
    [account, setAccount]
  );

  return {
    account,
    setAccount,
    setAddress,
  };
};
