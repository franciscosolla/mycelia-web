"use client";

import type { Account } from "@/features/accounts/types";
import { detectAddressNetwork } from "@/lib/detectAddressNetwork";
import { useCallback } from "react";
import { useAccounts } from "./useAccounts";

export const useAccount = (accountId: string) => {
  const { accounts, setAccounts } = useAccounts();

  const account = accounts.get(accountId);

  const setAccount = useCallback(
    (account: Account | ((current: Account | undefined) => Account)) => {
      setAccounts((current) => {
        const next = new Map(current);
        next.set(
          accountId,
          typeof account === "function"
            ? account(next.get(accountId)!)
            : account
        );
        return next;
      });
    },
    [accountId, setAccounts]
  );

  const setAddress = useCallback(
    (address: string) => {
      setAccount((current) => {
        if (!current) {
          throw new Error("Account not found");
        }

        const network = detectAddressNetwork(address);

        if (!network) {
          throw new Error("Network not detected");
        }

        return {
          ...current,
          [network]: address,
        };
      });
    },
    [setAccount]
  );

  return {
    account,
    setAccount,
    setAddress,
    accountId,
  };
};
