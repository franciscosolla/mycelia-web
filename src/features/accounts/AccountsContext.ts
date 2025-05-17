import type { Account } from "@/features/accounts/types";
import { createContext, type Dispatch, type SetStateAction } from "react";

export const AccountsContext = createContext<{
  accounts: Account[];
  setAccounts: Dispatch<SetStateAction<Account[]>>;
}>({
  accounts: [],
  setAccounts: () => {},
});
