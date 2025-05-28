"use client";

import { provider, providerOptions } from "@/lib/walletConnect";
import { useCallback, useState } from "react";
import type { Address } from "viem";
import { ethereumWalletState, useEthereumWallet } from "./useEthereumWallet";

export const useAccount2 = () => {
  const [error, setError] = useState<Error | null>(null);

  const ethereumWallet = useEthereumWallet();

  const [providerUri, setProviderUri] = useState<string | null>(null);

  const connect = useCallback(() => {
    setError(null);

    // Subscribe for pairing URI
    provider.on("display_uri", setProviderUri);

    // // Subscribe to session ping
    // provider.on("session_ping", ({ id, topic }) => {
    //   console.log("session_ping", id, topic);
    // });

    // // Subscribe to session event
    // provider.on("session_event", ({ event, chainId }) => {
    //   console.log("session_event", event, chainId);
    // });

    // // Subscribe to session update
    // provider.on("session_update", ({ topic, params }) => {
    //   console.log("session_update", topic, params);
    // });

    // // Subscribe to session delete
    // provider.on("session_delete", ({ id, topic }) => {
    //   console.log("session_delete", id, topic);
    // });

    provider.connect(providerOptions).then((session) => {
      if (session) {
        const accounts = session.namespaces.eip155.accounts;
        const account = accounts[0].split(":")[2];

        ethereumWalletState.set(account as Address);
      }
    });
  }, []);

  const disconnect = useCallback(
    () =>
      provider
        .disconnect()
        .then(() => ethereumWalletState.set(null))
        .catch(setError),
    []
  );

  return {
    ethereumWallet,
    connect,
    disconnect,
    isConnecting: ethereumWallet === undefined,
    isConnected: !!ethereumWallet,
    error,
    providerUri,
  };
};
