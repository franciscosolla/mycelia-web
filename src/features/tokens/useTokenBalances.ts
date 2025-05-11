"use client";
import { alchemy } from "@/lib/alchemy";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { erc20Abi, type Address } from "viem";
import { useAccount, useBalance, useReadContracts } from "wagmi";

export const useTokenBalances = () => {
  const { address } = useAccount();
  const { data: ethBalance } = useBalance({ address });

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

  const balances = useMemo(
    () => [
      ethBalance?.value,
      ...(tokenBalances ? tokenBalances.map(({ result }) => result) : []),
    ],
    [ethBalance, tokenBalances]
  );
  const addresses = useMemo(
    () => [
      "0x0000000000000000000000000000000000000000",
      ...(tokenAddresses ? tokenAddresses : []),
    ],
    [tokenAddresses]
  );

  const { data: coins } = useQuery({
    queryKey: ["tokenUsdPrice", address],
    queryFn: () =>
      fetch(
        `https://coins.llama.fi/prices/current/ethereum:${addresses?.join(
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

  return useMemo(() => {
    const totalUsd = addresses?.reduce((acc, tokenAddress, tokenIndex) => {
      const balance = balances?.[tokenIndex];
      const coin = coins?.[`ethereum:${tokenAddress}`];
      if (!coin || !balance) {
        return acc;
      }

      const weightedBalance = Number(balance) / 10 ** coin.decimals;

      return acc + weightedBalance * coin.price;
    }, 0);

    return {
      tokens: addresses?.map((tokenAddress, tokenIndex) => ({
        tokenAddress,
        balance: balances?.[tokenIndex],
        coin: coins?.[`ethereum:${tokenAddress}`],
      })),
      totalUsd,
    };
  }, [coins, addresses, balances]);
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
