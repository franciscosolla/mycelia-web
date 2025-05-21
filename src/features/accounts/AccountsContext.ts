import type { Account, Wallet } from "@/features/accounts/types";
import { createContext, type Dispatch, type SetStateAction } from "react";

export const AccountsContext = createContext<{
  accounts: Map<string, Account>;
  setAccounts: Dispatch<SetStateAction<Map<string, Account>>>;
  wallets: Map<Wallet["address"], Wallet>;
  setWallets: Dispatch<SetStateAction<Map<Wallet["address"], Wallet>>>;
}>({
  accounts: new Map(),
  setAccounts: () => {},
  wallets: new Map(),
  setWallets: () => {},
});
