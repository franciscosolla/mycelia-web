"use client";

import UniversalProvider from "@walletconnect/universal-provider";
import { BrowserProvider, type JsonRpcSigner, type Listener } from "ethers";
import type { Wallet } from "./types";

//  create sub providers for each namespace/chain
export const connectWalletUniversalProvider = async (): Promise<Wallet> => {
  //  Initialize the provider
  const provider = await UniversalProvider.init({
    projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID,
    metadata: {
      name: "Mycelia",
      description: "The multichanin network",
      url: "https://mycelia.solla.dev/",
      icons: ["https://mycelia.solla.dev/favicon.ico"],
    },
  });

  await provider.connect({
    namespaces: {
      eip155: {
        methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
        chains: ["eip155:1"], // Ethereum Mainnet (eip155:137 for Polygon, etc.)
        events: ["chainChanged", "accountsChanged"],
        rpcMap: {
          1: "https://rpc.ankr.com/eth",
        },
      },
    },
  });

  const uri = provider.uri; // Get the URI

  if (!uri) {
    throw new Error("No URI found");
  }

  const metaMaskDeeplink = `https://metamask.app.link/wc?uri=${encodeURIComponent(
    uri
  )}`;
  window.location.href = metaMaskDeeplink;

  const ethersProvider = new BrowserProvider(provider);

  let signer: JsonRpcSigner;

  const [address, network] = await Promise.all([
    ethersProvider.getSigner().then((s) => {
      signer = s;
      return signer.getAddress();
    }),
    ethersProvider.getNetwork(),
  ]);

  console.log("Connected Address:", address);

  return {
    address,
    network,
    getBalance() {
      return ethersProvider
        .getBalance(address)
        .then((balance) => (Number(balance) / 1e18).toFixed(4));
    },
    onBlock(listener: Listener) {
      provider.on("block", listener);
      return () => provider.off("block", listener);
    },
  };
};
