import { GlobalState } from "@/lib/GlobalState";
import type { Account } from "./types";

export const addAccount = (account: Account) =>
  GlobalState.set("account", (accounts: Account[] | undefined) => {
    if (Array.isArray(accounts)) {
      return [...accounts, account];
    } else {
      return [account];
    }
  });
