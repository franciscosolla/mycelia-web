"use client";
import { useMemo } from "react";
import { type Address } from "viem";
import { useCoinBalances } from "./useCoinBalances";
import { useDeFiLlamaPrices } from "./useDeFiLlamaPrices";

/**
 * React hook that returns the full portfolio view of the connected wallet,
 * including per-token balances and their total value in USD.
 *
 * This hook:
 * - Retrieves coin balances (ETH + ERC-20s) via `useCoinBalances()`
 * - Fetches USD prices and metadata via `useDeFiLlamaPrices()`
 * - Calculates the USD value of each token based on its balance and price
 * - Computes the total wallet value in USD
 *
 * All balances are assumed to be in raw units (`bigint` or `number`) and
 * are normalized using each token's `decimals` value from DeFiLlama.
 *
 * @returns An object containing:
 *   - `tokens`: An array of objects containing:
 *       - `tokenAddress`: The contract address or ETH_ADDRESS
 *       - `balance`: Raw token balance (as number)
 *       - `coin`: Price and metadata info from DeFiLlama
 *   - `totalUsd`: Aggregated USD value of the entire wallet (ETH + tokens)
 *
 * @example
 * const { tokens, totalUsd } = useBalance();
 * console.log(totalUsd); // e.g., 1423.57
 * console.log(tokens[0].coin.symbol, tokens[0].balance);
 */
export const useBalance = () => {
  const { data: balances } = useCoinBalances();

  const addresses = Object.keys(balances) as Address[];

  const { data: pricesData } = useDeFiLlamaPrices(addresses);

  return useMemo(() => {
    const totalUsd = addresses?.reduce((acc, address) => {
      const balance = balances[address];

      const priceData = pricesData?.[`ethereum:${address}`];

      if (!priceData || !balance) {
        return acc;
      }

      const weightedBalance = balance / 10 ** priceData.decimals;

      return acc + weightedBalance * priceData.price;
    }, 0);

    return {
      tokens: addresses?.map((address) => ({
        tokenAddress: address,
        balance: balances[address],
        coin: pricesData?.[`ethereum:${address}`],
      })),
      totalUsd,
    };
  }, [pricesData, addresses, balances]);
};
