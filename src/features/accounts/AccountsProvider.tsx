"use client";

import type { Account } from "@/features/accounts/types";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { AccountsContext } from "./AccountsContext";
import { getAccountsFromLocalStorage } from "./getAccountsFromLocalStorage";
import { persistAccounts } from "./persistAccounts";

export const AccountsProvider = ({ children }: PropsWithChildren) => {
  const [accounts, setAccounts] = useState<Account[]>(
    getAccountsFromLocalStorage
  );

  useEffect(() => {
    persistAccounts(accounts);
  }, [accounts]);

  const value = useMemo(
    () => ({
      accounts,
      setAccounts,
    }),
    [accounts]
  );

  return (
    <AccountsContext.Provider value={value}>
      {children}\
    </AccountsContext.Provider>
  );
};
