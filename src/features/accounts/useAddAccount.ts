"use client";

import type { Account } from "@/features/accounts/types";
import { useCallback, useContext } from "react";
import { AccountsContext } from "./AccountsContext";

export const useAddAccount = () => {
  const { accounts, setAccounts } = useContext(AccountsContext);

  const addAccount = useCallback(
    (account: Account) => {
      setAccounts((current) => [...current, account]);
      return accounts.length;
    },
    [accounts.length, setAccounts]
  );

  return {
    addAccount,
  };
};
