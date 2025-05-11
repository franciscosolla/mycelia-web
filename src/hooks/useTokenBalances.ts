"use client";
import { mergeQueryStates } from "@/lib/mergeQueyStates";
import { useMemo } from "react";
import { erc20Abi, type Address } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { useTokenAddresses } from "./useTokenAddresses";

/**
 * React hook to fetch and format the on-chain ERC-20 token balances for the connected wallet.
 *
 * This hook:
 * - Uses `useTokenAddresses()` to retrieve ERC-20 token contract addresses with non-zero balances
 * - Uses `wagmi`'s `useReadContracts()` to batch call `balanceOf` for each token
 * - Returns a normalized object mapping contract addresses to numeric balances (excluding zero balances)
 * - Merges query states from both `useTokenAddresses` and `useReadContracts` to give accurate loading/error info
 *
 * @returns An object with:
 *   - `data`: A record mapping token addresses to balance values (as numbers)
 *   - `isLoading`, `isFetching`, `isError`, etc. — merged query state
 *   - Other standard query state fields from `useReadContracts`
 *
 * @example
 * const { data: balances, isLoading } = useTokenBalances();
 * console.log(balances?.['0x...']); // prints 4.52 or similar
 */
export const useTokenBalances = () => {
  const { address: walletAddress } = useAccount();
  const { data: tokenAddresses, ...tokenAddressesQueryState } =
    useTokenAddresses();

  const contracts = tokenAddresses?.map((tokenAddress) => ({
    address: tokenAddress as Address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [walletAddress],
  }));

  const { data: tokenBalances, ...readContractsQueryState } = useReadContracts({
    contracts,
    query: {
      enabled: !!walletAddress && !!tokenAddresses?.length,
      staleTime: 5000,
      gcTime: Infinity,
    },
  });

  const data = useMemo(
    () =>
      tokenAddresses?.reduce((result, tokenAddress, index) => {
        if (
          !tokenBalances?.[index].result ||
          Number(tokenBalances[index].result) === 0
        ) {
          return result;
        }

        return {
          ...result,
          [tokenAddress]: Number(tokenBalances[index].result),
        };
      }, {} as Record<Address, number>),
    [tokenAddresses, tokenBalances]
  );

  return {
    data,
    ...readContractsQueryState,
    ...mergeQueryStates(tokenAddressesQueryState, readContractsQueryState),
  };
};
