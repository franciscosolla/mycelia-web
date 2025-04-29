"use client";
import type { PropsWithChildren } from "react";
import { createConfig, http, WagmiProvider as Provider } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import {
  coinbaseWallet,
  injected,
  metaMask,
  safe,
  walletConnect,
} from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
    coinbaseWallet(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});

export const WagmiProvider = ({ children }: PropsWithChildren) => {
  return <Provider config={config}>{children}</Provider>;
};
