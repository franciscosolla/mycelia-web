"use client";

import type { Account } from "@/features/accounts/types";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { AccountsContext } from "./AccountsContext";
import { getAccountsFromLocalStorage } from "./getAccountsFromLocalStorage";
import { persistAccounts } from "./persistAccounts";

export const AccountsProvider = ({ children }: PropsWithChildren) => {
  const [_accounts, setAccounts] = useState<Account[]>(
    getAccountsFromLocalStorage
  );

  useEffect(() => {
    persistAccounts(_accounts);
  }, [_accounts]);

  const value = useMemo(
    () => ({
      accounts: _accounts.map((account) => ({
        ...account,
        get name() {
          return account.name ?? `Account ${_accounts.indexOf(account)}`;
        },
        get symbol() {
          return `${
            account.name
              ? account.name.toUpperCase()
              : `A${_accounts.indexOf(account)}`
          }`.slice(0, 2);
        },
      })),
      setAccounts,
    }),
    [_accounts]
  );

  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
};
