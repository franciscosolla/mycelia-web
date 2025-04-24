"use client";
import type { AbstractProvider } from "ethers";
import { BrowserProvider } from "ethers";
import { useRef, useState } from "react";

type Base = {
  connect: () => void;
  error: string | null;
  isConnecting: boolean;
};

type Connected = {
  isConnected: true;
  address: string;
  balance: string;
  network: string;
};

type Disconnected = {
  isConnected: false;
  address: null;
  balance: null;
  network: null;
};

export type Wallet = Base & (Connected | Disconnected);

export const useWallet = (): Wallet => {
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [network, setNetwork] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const providerRef = useRef<BrowserProvider | AbstractProvider | null>(null);

  const connect = async () => {
    if (!window) {
      setError("No window object found");
      return;
    } else {
      setError(null);
      setIsConnecting(true);

      if (!window.ethereum) {
        setError("No provider found");
        setIsConnecting(false);
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new BrowserProvider(window.ethereum);

      providerRef.current = provider;

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      setAddress(address);
      setBalance((Number(balance) / 1e18).toFixed(4));
      setNetwork(network.name);

      setIsConnected(true);
      setIsConnecting(false);
    }
  };

  return {
    connect,
    isConnecting,
    error,
    isConnected,
    address,
    balance,
    network,
  } as Wallet;
};
