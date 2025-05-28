import { useQuery } from "@tanstack/react-query";

/**
 * React hook to fetch real-time USD prices for a list of ERC-20 tokens from the DeFiLlama API.
 *
 * This hook:
 * - Accepts an array of ERC-20 token contract addresses
 * - Calls the DeFiLlama `prices/current` endpoint for all provided tokens
 * - Returns a map of price data keyed by `ethereum:<tokenAddress>`
 * - Uses short caching (`staleTime: 5000ms`) for near-real-time updates
 *
 * @param addresses - An array of ERC-20 token addresses (lowercased or checksummed)
 *
 * @returns A React Query result object containing:
 *   - `data`: A record of token price metadata keyed by `ethereum:<address>`
 *   - `isLoading`, `isFetching`, `isError`, `error`, `refetch`, etc.
 *
 * @example
 * const { data: prices } = useDeFiLlamaPrices([
 *   "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
 *   "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
 * ]);
 *
 * const usdcPrice = prices?.["ethereum:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"]?.price;
 */
export const useDeFiLlamaPrices = (addresses: string[]) =>
  useQuery({
    queryKey: ["deFiLlamaPrices", ...addresses],
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
    staleTime: 5000,
    gcTime: Infinity,
    enabled: !!addresses?.length,
  });

export type DeFiLlamaTokenPriceResponse = {
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
