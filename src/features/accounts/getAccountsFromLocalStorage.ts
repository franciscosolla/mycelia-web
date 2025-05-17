import type { Account } from "./types";

export const getAccountsFromLocalStorage = (): Account[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window?.localStorage.getItem("accounts");

  if (raw) {
    return JSON.parse(raw);
  }

  return [];
};
