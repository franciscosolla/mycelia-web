"use client";
import { useQuery } from "@tanstack/react-query";
import type { TokenMetadataResponse } from "alchemy-sdk";
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

      return fetch(`${API_BASE_URL}/coin/metadata/${tokenAddress}`).then(
        (res) => res.json() as unknown as TokenMetadataResponse
      );
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://mycelia-api.solla.dev";
