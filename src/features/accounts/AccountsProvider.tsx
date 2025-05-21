"use client";

import type { Account, Wallet } from "@/features/accounts/types";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { AccountsContext } from "./AccountsContext";
import {
  getAccountsFromLocalStorage,
  getWalletsFromLocalStorage,
} from "./getFromLocalStorage";
import { persistAccounts, persistWallets } from "./persist";

export const AccountsProvider = ({ children }: PropsWithChildren) => {
  const [_accounts, setAccounts] = useState<Map<string, Account>>(
    getAccountsFromLocalStorage
  );

  useEffect(() => {
    persistAccounts(_accounts);
  }, [_accounts]);

  const [_wallets, setWallets] = useState<Map<Wallet["address"], Wallet>>(
    getWalletsFromLocalStorage
  );

  useEffect(() => {
    persistWallets(_wallets);
  }, [_wallets]);

  const value = useMemo(
    () => ({
      accounts: _accounts,
      //  _accounts.map((account) => ({
      //   ...account,
      //   get name() {
      //     return account.name ?? `Account ${_accounts.indexOf(account)}`;
      //   },
      //   get symbol() {
      //     return `${
      //       account.name
      //         ? account.name.toUpperCase()
      //         : `A${_accounts.indexOf(account)}`
      //     }`.slice(0, 2);
      //   },
      // })),
      setAccounts,
      wallets: _wallets,
      setWallets,
    }),
    [_accounts, _wallets]
  );

  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
};
