"use client";

import type { Account } from "@/features/accounts/types";
import { detectAddressNetwork } from "@/lib/detectAddressNetwork";
import { useCallback } from "react";
import { useAccounts } from "./useAccounts";

export const useAccount = (accountId: number = 0) => {
  const { accounts, setAccounts } = useAccounts();

  const account = accounts[accountId] as Account | undefined;

  const setAccount = useCallback(
    (account: Account) => {
      setAccounts((current) => {
        const next = [...current];
        next[accountId] = account;
        return next;
      });
    },
    [accountId, setAccounts]
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
    accountId,
  };
};
