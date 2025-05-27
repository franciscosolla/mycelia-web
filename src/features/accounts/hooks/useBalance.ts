import { useDeFiLlamaPrices } from "@/hooks/useDeFiLlamaPrices";
import { ETH_ADDRESS } from "@/lib/ethereum";
import { getAlchemyTokenBalances } from "@/lib/getAlchemyTokenBalances";
import { getValues, uniq } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { TokenBalance } from "alchemy-sdk";
import { erc20Abi, type Address } from "viem";
import { useReadContracts } from "wagmi";
import { useAccountStore } from "./useAccountStore";
import { useEthereumBalances } from "./useEthereumBalances";

export interface Balance {
  address: Address;
  balance: string | number | bigint;
  price: number;
  decimals: number;
  symbol: string;
  value: number;
}

export const useBalance = () => {
  const accounts = useAccountStore.use.accounts();

  const ethereumWallets = uniq(getValues(accounts, "ethereum"));

  const ethereumBalances = useEthereumBalances(ethereumWallets).data;

  let erc20AlchemyBalances = useQuery({
    queryKey: ["alchemy", "erc20", "balance"],
    queryFn: () => Promise.all(ethereumWallets.map(getAlchemyTokenBalances)),
    enabled: !!ethereumWallets.length,
    staleTime: Infinity,
    gcTime: Infinity,
  }).data;

  erc20AlchemyBalances = erc20AlchemyBalances?.map((balances) => {
    return balances?.filter(
      ({ tokenBalance }) => tokenBalance && Number(tokenBalance) > 0
    );
  });

  const erc20Contracts =
    erc20AlchemyBalances?.flatMap(
      (tokens, index) => tokens?.map(toContract(ethereumWallets[index])) ?? []
    ) ?? [];

  const erc20Balances = useErc20Balances(erc20Contracts).data;

  const erc20Prices = useDeFiLlamaPrices([
    ETH_ADDRESS,
    ...uniq(getValues(erc20Contracts, "address")),
  ]).data;

  const balances = ethereumWallets.reduce((acc, wallet, index) => {
    const balance = ethereumBalances?.[index];
    acc[wallet] = balance ? [toBalance(ETH_ADDRESS, balance, erc20Prices)] : [];

    return acc;
  }, {} as Record<Address, Balance[]>);

  erc20Contracts.forEach(({ address, args: [wallet] }, index) => {
    const balance = erc20Balances?.[index].result;

    if (balance) {
      balances[wallet].push(toBalance(address, balance, erc20Prices));
    }
  });

  return balances;
};

const toContract =
  (wallet: Address) =>
  ({ contractAddress }: TokenBalance) => ({
    address: contractAddress as Address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [wallet],
  });

const useErc20Balances = (
  contracts: ReturnType<ReturnType<typeof toContract>>[]
) =>
  useReadContracts({
    contracts,
    query: {
      enabled: !!contracts.length,
      staleTime: 5000,
      gcTime: Infinity,
    },
  });

const toBalance = (
  address: Address,
  balance: string | number | bigint,
  prices: ReturnType<typeof useDeFiLlamaPrices>["data"]
) => {
  const decimals = prices?.[`ethereum:${address}`]?.decimals ?? 0;

  return {
    address,
    balance,
    price: prices?.[`ethereum:${address}`]?.price ?? 0,
    decimals,
    symbol: prices?.[`ethereum:${address}`]?.symbol ?? "",
    value: Number(balance) / 10 ** decimals,
  };
};
