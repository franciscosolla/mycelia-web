import type { Wallet } from "../wallet/types";
import type { Account } from "./types";

const persist = <Value>(key: string, value: Value) =>
  window?.localStorage.setItem(key, JSON.stringify(value));

export const persistAccounts = (accounts: Map<string, Account>) =>
  persist("accounts", [...accounts.entries()]);

export const persistWallets = (wallets: Map<Wallet["address"], Wallet>) =>
  persist("wallets", [...wallets.entries()]);
