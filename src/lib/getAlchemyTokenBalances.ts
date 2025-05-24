import { alchemy } from "@/lib/alchemy";
import {
  TokenBalanceType,
  type TokenBalance,
  type TokenBalancesOptionsErc20,
  type TokenBalancesResponseErc20,
} from "alchemy-sdk";

/**
 * Fetches all ERC-20 token balances for a given wallet address using Alchemy's paginated API.
 *
 * Alchemy's `getTokenBalances` may return results across multiple pages.
 * This function handles pagination transparently by following `pageKey` until all results are retrieved.
 *
 * @param walletAddress - The Ethereum address to fetch token balances for.
 * @returns A promise that resolves to an array of `TokenBalance` objects, representing all ERC-20 tokens held by the wallet.
 *
 * @example
 * const balances = await getAlchemyTokenBalances("0xabc123...");
 * console.log(balances[0].contractAddress, balances[0].tokenBalance);
 */
export const getAlchemyTokenBalances = async (address: string) => {
  const response: {
    tokenBalances: TokenBalance[];
    address: string;
  } = { address, tokenBalances: [] };

  let pageKey: string | undefined = undefined;

  while (1) {
    let result: TokenBalancesResponseErc20;

    if (pageKey) {
      const options: TokenBalancesOptionsErc20 = {
        type: TokenBalanceType.ERC20,
        pageKey,
      };
      result = await alchemy.core.getTokenBalances(address, options);
    } else {
      result = await alchemy.core.getTokenBalances(address);
    }

    pageKey = result.pageKey;
    response.tokenBalances = response.tokenBalances.concat(
      result.tokenBalances
    );

    if (!pageKey) {
      return response;
    }
  }
};
