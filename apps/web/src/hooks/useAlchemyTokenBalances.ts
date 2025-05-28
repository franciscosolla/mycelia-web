import { getAlchemyTokenBalances } from "@/lib/getAlchemyTokenBalances";
import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";

/**
 * React hook to fetch all ERC-20 token balances for the connected wallet using Alchemy.
 *
 * This hook wraps `getAlchemyTokenBalances` in a `useQuery` from React Query,
 * enabling automatic caching, deduplication, and background updates.
 *
 * It uses `wagmi` to detect the currently connected wallet address.
 * The query is only enabled when an address is present.
 *
 * @returns A React Query result object containing:
 *   - `data`: An array of ERC-20 token balances (if fetched successfully)
 *   - `isLoading`, `isError`, `error`, etc. — React Query metadata for status tracking
 *
 * @example
 * const { data: balances, isLoading } = useAlchemyTokenBalances();
 * if (balances) {
 *   console.log(balances[0].contractAddress, balances[0].tokenBalance);
 * }
 */
export const useAlchemyTokenBalances = (walletAddress: Address | undefined) =>
  useQuery({
    queryKey: ["alchemy", "getTokenBalances", walletAddress],
    queryFn: () => {
      if (!walletAddress) {
        throw new Error("Wallet address is required");
      }

      return getAlchemyTokenBalances(walletAddress);
    },
    enabled: !!walletAddress,
    staleTime: Infinity,
    gcTime: Infinity,
  });
