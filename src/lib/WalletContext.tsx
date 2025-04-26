"use client";

import {
  BrowserProvider,
  type JsonRpcSigner,
  type Listener,
  type Network,
} from "ethers";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

type Wallet = {
  address: string;
  network: Network;
  getBalance: () => Promise<string>;
  onBlock: (listener: Listener) => () => void;
};

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
      connect()
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

const connect = async (): Promise<Wallet> => {
  if (!window) {
    throw new Error("No window object found");
  }

  const provider = new BrowserProvider(window.ethereum);

  let signer: JsonRpcSigner;

  const [address, network] = await Promise.all([
    provider.getSigner().then((s) => {
      signer = s;
      return signer.getAddress();
    }),
    provider.getNetwork(),
  ]);

  return {
    address,
    network,
    getBalance() {
      return provider
        .getBalance(address)
        .then((balance) => (Number(balance) / 1e18).toFixed(4));
    },
    onBlock(listener: Listener) {
      provider.on("block", listener);
      return () => provider.off("block", listener);
    },
  };
};
