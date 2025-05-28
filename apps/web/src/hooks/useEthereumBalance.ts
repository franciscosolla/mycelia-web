import type { Address } from "viem";
import { useBalance } from "wagmi";

/**
 * React hook to fetch the native Ethereum (ETH) balance for the connected wallet.
 *
 * This hook uses:
 * - `wagmi`'s `useAccount()` to detect the currently connected wallet address
 * - `wagmi`'s `useBalance()` to fetch the on-chain native balance (ETH on Ethereum mainnet)
 *
 * @returns A wagmi `useBalance` result object including:
 *   - `data`: The balance object with `value`, `formatted`, `symbol`, etc.
 *   - `isLoading`, `isError`, `refetch`, and all standard React Query state
 *
 * @example
 * const { data: eth, isLoading } = useEthereumBalance();
 * console.log(eth?.formatted); // e.g., "0.4281"
 */
export const useEthereumBalance = (address: Address | undefined) =>
  useBalance({ address });
