"use client";
import { useAccount } from "wagmi";
import { WalletOptions } from "./WalletOptions";

export const ConnectWallet = () => {
  const { isConnected } = useAccount();

  return isConnected ? null : <WalletOptions />;
};
