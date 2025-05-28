"use client";

import type { PropsWithChildren } from "react";
import { useAccount } from "wagmi";

export const RequiresWallet = ({ children }: PropsWithChildren) => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return null;
  }

  return children;
};
