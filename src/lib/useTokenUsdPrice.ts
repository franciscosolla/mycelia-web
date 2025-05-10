import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";

export const useTokenUsdPrice = (tokenAddress: Address) =>
  useQuery({
    queryKey: ["tokenUsdPrice", tokenAddress],
    queryFn: () =>
      fetch(`https://coins.llama.fi/prices/current/ethereum:${tokenAddress}`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      })
        .then((res) => res.json() as Promise<DeFiLlamaTokenPriceResponse>)
        .then((data) => data.coins[`ethereum:${tokenAddress}`].price),
    staleTime: Infinity,
    gcTime: Infinity,
  });

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
