"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { Wallet } from "./types";
import { connectWalletBrowser } from "./walletConnectBrowser";
import { connectWalletUniversalProvider } from "./walletConnectUniversalProvider";

const Context = createContext<{
  wallet: Wallet | null | undefined;
  connectWallet: () => void;
  isConnecting: boolean;
}>({
  wallet: null,
  connectWallet: () => {},
  isConnecting: false,
});

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const [wallet, setWallet] = useState<Wallet | null | undefined>(null);

  const connectWallet = useCallback(() => {
    if (!wallet) {
      setWallet(undefined);

      const connectWallet = window.ethereum
        ? connectWalletBrowser
        : connectWalletUniversalProvider;

      connectWallet()
        .then(setWallet)
        .catch(() => {
          setWallet(null);
        });
    }
  }, [wallet]);

  const isConnecting = wallet === undefined;

  const value = useMemo(
    () => ({
      wallet,
      connectWallet,
      isConnecting,
    }),
    [connectWallet, isConnecting, wallet]
  );

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        setWallet(null);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => window.ethereum.off("accountsChanged", handleAccountsChanged);
  }, [connectWallet]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useWallet = () => {
  return useContext(Context);
};
