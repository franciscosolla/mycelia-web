import { ETH_ADDRESS } from "@/lib/ethereum";
import { mergeQueryStates } from "@/lib/mergeQueyStates";
import { useMemo } from "react";
import type { Address } from "viem";
import { useEthereumBalance } from "./useEthereumBalance";
import { useTokenBalances } from "./useTokenBalances";

/**
 * React hook that returns a unified record of all coin balances (ETH + ERC-20 tokens)
 * held by the connected wallet, excluding zero balances.
 *
 * This hook:
 * - Fetches the native Ethereum balance via `useEthereumBalance()`
 * - Fetches non-zero ERC-20 token balances via `useTokenBalances()`
 * - Combines both into a single flat `Record<Address, number>` object
 * - Uses `ETH_ADDRESS` as a virtual identifier for the native ETH coin
 * - Merges React Query states from both balance sources via `mergeQueryStates()`
 *
 * Native ETH balance is only included if it is non-zero. Token balances
 * from `useTokenBalances` are already filtered to exclude zeroes.
 *
 * @returns An object with:
 *   - `data`: A `Record<Address, number>` containing only non-zero balances
 *     - The key `ETH_ADDRESS` represents the native ETH balance
 *     - All other keys are ERC-20 token contract addresses
 *   - Combined React Query state: `isLoading`, `isError`, `refetch`, etc.
 *
 * @example
 * const { data: balances } = useCoinBalances();
 * console.log(balances[ETH_ADDRESS]);            // ETH balance (if any)
 * console.log(balances["0xA0b8..."]);            // USDC balance
 * console.log(Object.keys(balances).length);     // Number of non-zero coins
 */
export const useCoinBalances = (address: Address | undefined) => {
  const { data: ethBalance, ...ethBalanceQueryState } =
    useEthereumBalance(address);

  const { data: tokenBalances, ...tokenBalancesQueryState } =
    useTokenBalances(address);

  const data: Record<Address, number> = useMemo(() => {
    let balances: Record<Address, number> = {};

    const ethBalanceValue = Number(ethBalance?.value);

    if (ethBalanceValue) {
      balances[ETH_ADDRESS] = ethBalanceValue;
    }

    if (tokenBalances) {
      balances = {
        ...balances,
        ...(tokenBalances as Record<Address, number>),
      };
    }

    return balances;
  }, [ethBalance, tokenBalances]);

  return {
    data,
    ...mergeQueryStates(ethBalanceQueryState, tokenBalancesQueryState),
  };
};
