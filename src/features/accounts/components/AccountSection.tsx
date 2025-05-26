"use client";

import { useAccountStore } from "../hooks/useAccountStore";
import { Account } from "./Account";
import { Accounts } from "./Accounts";

export const AccountSection = () => {
  const hasMultipleAccounts = useAccountStore(
    (state) => state.accounts.length > 1
  );

  return hasMultipleAccounts ? <Accounts /> : <Account />;
};
