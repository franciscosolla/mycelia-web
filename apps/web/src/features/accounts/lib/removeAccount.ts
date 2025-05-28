import { GlobalState, type StorePath } from "@/lib/GlobalState";
import findKey from "lodash/findKey";
import type { Account } from "../types";

export const removeAccount = (account: Account) => {
  const index = findKey(GlobalState.get("account"), account);
  const path = `account.[${index}]` as StorePath;
  return path ? GlobalState.clear(path) : false;
};
