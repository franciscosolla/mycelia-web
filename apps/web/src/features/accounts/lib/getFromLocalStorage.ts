import type { Wallet } from "../../wallet/types";
import type { Account } from "../types";

export const getFromLocalStorage = <Value, Fallback>(
  key: string,
  fallback: Fallback
): Value | Fallback => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);

  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
    }
  }

  return fallback;
};

export const getAccountsFromLocalStorage = () =>
  new Map(getFromLocalStorage("accounts", []) as [string, Account][]);

export const getWalletsFromLocalStorage = () =>
  new Map(getFromLocalStorage("wallets", []) as [Wallet["address"], Wallet][]);
