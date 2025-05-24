import { useDeFiLlamaPrices } from "@/hooks/useDeFiLlamaPrices";
import { ETH_ADDRESS } from "@/lib/ethereum";
import { getAlchemyTokenBalances } from "@/lib/getAlchemyTokenBalances";
import { useQuery } from "@tanstack/react-query";
import { erc20Abi, type Address } from "viem";
import { useReadContracts } from "wagmi";
import { useAccounts } from "./useAccounts";
import { useEthereumBalances } from "./useEthereumBalances";

export const useBalance = () => {
  const [accounts] = useAccounts();

  const ethereumWallets = accounts?.map((account) => account.ethereum) ?? [];

  const { data: ethereumBalances } = useEthereumBalances(ethereumWallets);

  let { data: erc20AlchemyBalances } = useQuery({
    queryKey: ["alchemy", "erc20", "balance"],
    queryFn: () => Promise.all(ethereumWallets.map(getAlchemyTokenBalances)),
    enabled: !!ethereumWallets.length,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  erc20AlchemyBalances = erc20AlchemyBalances?.map((balances) => {
    return balances?.filter(
      ({ tokenBalance }) => tokenBalance && Number(tokenBalance) > 0
    );
  });

  const erc20Contracts =
    erc20AlchemyBalances?.flatMap(
      (tokens, index) =>
        tokens?.map(({ contractAddress }) => ({
          address: contractAddress as Address,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [ethereumWallets[index]],
        })) ?? []
    ) ?? [];

  const { data: erc20Balances } = useReadContracts({
    contracts: erc20Contracts,
    query: {
      enabled: !!erc20Contracts?.length,
      staleTime: 5000,
      gcTime: Infinity,
    },
  });

  const { data: erc20Prices } = useDeFiLlamaPrices([
    ETH_ADDRESS,
    ...new Set(erc20Contracts.map(({ address }) => address)).values(),
  ]);

  const balances = ethereumWallets.reduce((acc, wallet, index) => {
    acc[wallet] = ethereumBalances?.[index]
      ? [
          {
            address: ETH_ADDRESS,
            balance: ethereumBalances[index],
            price: erc20Prices?.[`ethereum:${ETH_ADDRESS}`]?.price ?? 0,
            decimals: erc20Prices?.[`ethereum:${ETH_ADDRESS}`]?.decimals ?? 0,
            symbol: erc20Prices?.[`ethereum:${ETH_ADDRESS}`]?.symbol ?? "",
          },
        ]
      : [];

    return acc;
  }, {} as Record<Address, { address: Address; balance: string | number | bigint; price: number; decimals: number; symbol: string }[]>);

  erc20Contracts.forEach(({ address, args: [wallet] }, index) => {
    const balance = erc20Balances?.[index].result;

    if (balance) {
      balances[wallet].push({
        address,
        balance,
        price: erc20Prices?.[`ethereum:${address}`]?.price ?? 0,
        decimals: erc20Prices?.[`ethereum:${address}`]?.decimals ?? 0,
        symbol: erc20Prices?.[`ethereum:${address}`]?.symbol ?? "",
      });
    }
  });

  return balances;
};
