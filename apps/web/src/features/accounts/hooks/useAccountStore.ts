import { createSelectors } from "@/lib/createSelectors";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Account } from "../types";

interface AccountStore {
  current: Account | null;
  accounts: Account[];
  addAccount: (account: Account) => void;
  removeAccount: (account: Account) => void;
}

export const useAccountStore = createSelectors(
  create<AccountStore>()(
    devtools(
      persist(
        (set) => ({
          current: null,
          accounts: [],
          addAccount: (account) =>
            set((state) => ({
              current: account,
              accounts: [...state.accounts, account],
            })),
          removeAccount: (account) =>
            set((state) => ({
              current:
                state.current === account
                  ? state.accounts[0] ?? null
                  : state.current,
              accounts: state.accounts.filter((a) => a !== account),
            })),
        }),
        { name: "account-store" }
      )
    )
  )
);
