"use client";
import { alchemy } from "@/lib/alchemy";
import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";

export const useTokenMetadata = (tokenAddress: Address) =>
  useQuery({
    queryKey: ["tokenMetadata", tokenAddress],
    queryFn: () => {
      if (tokenAddress === "0x0000000000000000000000000000000000000000") {
        return {
          name: "Ethereum",
          symbol: "ETH",
          decimals: 18,
          logo: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png", // or use static.alchemyapi.io, TrustWallet logo CDN, etc.
        };
      }

      return alchemy.core.getTokenMetadata(tokenAddress);
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
