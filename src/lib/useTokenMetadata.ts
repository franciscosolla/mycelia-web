"use client";
import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";
import { alchemy } from "./alchemy";

export const useTokenMetadata = (tokenAddress: Address) =>
  useQuery({
    queryKey: ["tokenMetadata", tokenAddress],
    queryFn: () => alchemy.core.getTokenMetadata(tokenAddress),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
