"use client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { erc20Abi, type Address } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { alchemy } from "./alchemy";

export const useTokenBalances = () => {
  const { address } = useAccount();

  const { data: tokenAddresses } = useQuery({
    queryKey: ["tokenBalances", address],
    queryFn: () =>
      alchemy.core
        .getTokenBalances(address!)
        .then((result) =>
          result.tokenBalances.map((token) => token.contractAddress as Address)
        ),
    enabled: !!address,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: tokenBalances } = useReadContracts({
    contracts: tokenAddresses?.map((tokenAddress) => ({
      address: tokenAddress as Address,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address],
    })),
    query: {
      enabled: !!address && !!tokenAddresses?.length,
      staleTime: 5000,
      gcTime: Infinity,
    },
  });

  const { data: coins } = useQuery({
    queryKey: ["tokenUsdPrice", address],
    queryFn: () =>
      fetch(
        `https://coins.llama.fi/prices/current/ethereum:${tokenAddresses?.join(
          ",ethereum:"
        )}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      )
        .then((res) => res.json() as Promise<DeFiLlamaTokenPriceResponse>)
        .then((data) => data.coins),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!tokenAddresses?.length,
  });

  return useMemo(
    () =>
      tokenAddresses?.map((tokenAddress, tokenIndex) => ({
        tokenAddress,
        balance: tokenBalances?.[tokenIndex].result,
        coin: coins?.[`ethereum:${tokenAddress}`],
      })),
    [coins, tokenAddresses, tokenBalances]
  );
};

type DeFiLlamaTokenPriceResponse = {
  coins: {
    [key: string]: {
      price: number;
      decimals: number;
      symbol: string;
      timestamp: number;
      confidence: number;
    };
  };
};
