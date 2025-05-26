import { createSelectors } from "@/lib/createSelectors";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Account } from "../types";

interface AccountStore {
  accounts: Account[];
  addAccount: (account: Account) => void;
  removeAccount: (account: Account) => void;
}

export const useAccountStore = createSelectors(
  create<AccountStore>()(
    devtools(
      persist(
        (set) => ({
          accounts: [],
          addAccount: (account) =>
            set((state) => ({
              accounts: [...state.accounts, account],
            })),
          removeAccount: (account) =>
            set((state) => ({
              accounts: state.accounts.filter((a) => a !== account),
            })),
        }),
        { name: "account-store" }
      )
    )
  )
);
