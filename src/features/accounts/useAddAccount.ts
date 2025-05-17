"use client";

import type { Account } from "@/features/accounts/types";
import { useCallback } from "react";
import { useAccounts } from "./useAccounts";

export const useAddAccount = () => {
  const { accounts, setAccounts } = useAccounts();

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
