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
  useMemo,
  useRef,
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
  readonly wallet: Wallet | null;
  connectWallet: () => void;
  isConnecting: boolean;
}>({
  wallet: null,
  connectWallet: () => {},
  isConnecting: false,
});

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const walletRef = useRef<Wallet | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connectWallet = useCallback(() => {
    if (!walletRef.current) {
      setConnecting(true);
      connect()
        .then((wallet) => {
          walletRef.current = wallet;
        })
        .finally(() => setConnecting(false));
    }
  }, []);

  const isConnecting = connecting;

  const value = useMemo(
    () => ({
      get wallet() {
        return walletRef.current;
      },
      connectWallet,
      isConnecting,
    }),
    [connectWallet, isConnecting]
  );

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
