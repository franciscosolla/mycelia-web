import type { Account } from "./types";

export const getAccountsFromLocalStorage = (): Account[] => {
  const raw = window?.localStorage.getItem("accounts");

  if (raw) {
    return JSON.parse(raw);
  }

  return [];
};
