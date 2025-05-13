"use client";

import { useSyncExternalStore } from "react";
import { Address } from "viem";
import { LocalStorageState } from "../lib/LocalStorageState";

export const ethereumWalletState = new LocalStorageState<Address | null>(
  null,
  "ethereumWallet"
);

export const useEthereumWallet = () =>
  useSyncExternalStore(
    ethereumWalletState.subscribe,
    ethereumWalletState.get,
    ethereumWalletState.get
  );
