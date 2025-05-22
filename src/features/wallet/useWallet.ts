import { useData } from "../store/useData";
import type { Wallet } from "./types";
import { WalletStore } from "./WalletStore";

export const useWallet = (wallet: Partial<Wallet>) =>
  useData(WalletStore, WalletStore.getId(wallet)!);
