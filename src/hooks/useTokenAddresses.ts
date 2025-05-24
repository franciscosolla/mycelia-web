import { useMemo } from "react";
import type { Address } from "viem";
import { useAlchemyTokenBalances } from "./useAlchemyTokenBalances";

/**
 * React hook that extracts ERC-20 token contract addresses from Alchemy token balances.
 *
 * This hook builds on `useAlchemyTokenBalances()` and returns only the contract addresses
 * of tokens with a non-zero balance.
 *
 * Internally, it:
 * - Fetches all token balances via Alchemy
 * - Filters out tokens with `tokenBalance <= 0`
 * - Returns a memoized array of valid `contractAddress` strings
 *
 * @returns An object containing:
 *   - `data`: Array of ERC-20 contract addresses with non-zero balances
 *   - All other React Query state (`isLoading`, `isError`, etc.) from `useAlchemyTokenBalances`
 *
 * @example
 * const { data: tokenAddresses } = useTokenAddresses();
 * // tokenAddresses = ["0xA0b8...", "0xC02a..."]
 */
export const useTokenAddresses = (walletAddress: Address | undefined) => {
  const { data: { tokenBalances } = {}, ...state } =
    useAlchemyTokenBalances(walletAddress);

  const tokenAddresses = useMemo(
    () =>
      tokenBalances
        ?.filter(({ tokenBalance }) => Number(tokenBalance) > 0)
        .map(({ contractAddress }) => contractAddress),
    [tokenBalances]
  );

  return { data: tokenAddresses, ...state };
};
