import { useContext } from "react";
import { AccountsContext } from "./AccountsContext";

export const useAccounts = () => useContext(AccountsContext);
