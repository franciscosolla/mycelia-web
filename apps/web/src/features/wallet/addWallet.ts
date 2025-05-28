import { GlobalState } from "@/lib/GlobalState";
import type { Wallet } from "./types";

export const addWallet = (wallet: Wallet) =>
  GlobalState.set("wallet", (wallets: Wallet[] | undefined) => {
    if (Array.isArray(wallets)) {
      return [...wallets, wallet];
    } else {
      return [wallet];
    }
  });
