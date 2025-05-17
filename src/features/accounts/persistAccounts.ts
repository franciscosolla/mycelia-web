import type { Account } from "./types";

export const persistAccounts = (accounts: Account[]) => {
  window?.localStorage.setItem("accounts", JSON.stringify(accounts));
};
