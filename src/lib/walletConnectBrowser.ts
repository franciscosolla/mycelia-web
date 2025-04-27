"use client";
import { BrowserProvider, type JsonRpcSigner, type Listener } from "ethers";
import type { Wallet } from "./types";

export const connectWalletBrowser = async (): Promise<Wallet> => {
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
