import { useDeFiLlamaPrices } from "@/hooks/useDeFiLlamaPrices";
import { ETH_ADDRESS } from "@/lib/ethereum";
import { getAlchemyTokenBalances } from "@/lib/getAlchemyTokenBalances";
import { useQuery } from "@tanstack/react-query";
import { erc20Abi, type Address } from "viem";
import { usePublicClient, useReadContracts } from "wagmi";
import { useAccounts } from "./useAccounts";

export const useBalance = () => {
  const [accounts] = useAccounts();

  const ethereumWallets = accounts?.map((account) => account.ethereum) ?? [];

  const client = usePublicClient();

  const { data: ethBalances } = useQuery({
    queryKey: ["ethereum", "balance"],
    queryFn: async () => {
      const balances = await Promise.all(
        ethereumWallets.map((address) => client?.getBalance({ address }))
      );

      return ethereumWallets.reduce<Record<Address, bigint>>(
        (acc, address, i) => {
          acc[address] = balances[i] as bigint;
          return acc;
        },
        {}
      );
    },
    enabled: ethereumWallets.length > 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { data: erc20AlchemyBalances } = useQuery({
    queryKey: ["alchemy", "erc20", "balance"],
    queryFn: () =>
      Promise.all(
        ethereumWallets.map((walletAddress) =>
          getAlchemyTokenBalances(walletAddress)
        )
      ),
    enabled: !!ethereumWallets.length,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const erc20Addesses =
    erc20AlchemyBalances?.reduce((acc, erc20) => {
      if (erc20) {
        acc.push({
          wallet: erc20.address as Address,
          addresses: erc20.tokenBalances
            .filter(({ tokenBalance }) => tokenBalance && tokenBalance !== "0")
            .map(({ contractAddress }) => contractAddress) as Address[],
        });
      }
      return acc;
    }, [] as { addresses: Address[]; wallet: Address }[]) ?? [];

  const erc20Contracts = erc20Addesses?.flatMap(({ addresses, wallet }) =>
    addresses.map((address) => ({
      address,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [wallet],
    }))
  );

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

  const erc20 = erc20Contracts.reduce((acc, contract, index) => {
    const balance = erc20Balances?.[index].result;
    if (balance && String(balance) !== "0") {
      const wallet = contract.args[0] as Address;
      const balances = acc[wallet] ?? [];
      acc[wallet] = balances.concat({
        address: contract.address as Address,
        balance: erc20Balances[index].result,
        price: erc20Prices?.[`ethereum:${contract.address}`]?.price ?? 0,
        decimals: erc20Prices?.[`ethereum:${contract.address}`]?.decimals ?? 0,
        symbol: erc20Prices?.[`ethereum:${contract.address}`]?.symbol ?? "",
      });
    }
    return acc;
  }, {} as Record<Address, { address: Address; balance: string | number | bigint; price: number; decimals: number; symbol: string }[]>);

  ethereumWallets.forEach((wallet) => {
    const ethBalance = ethBalances?.[wallet];
    if (ethBalance && ethBalance > 0) {
      const balances = erc20[wallet] ?? [];
      erc20[wallet] = balances.concat({
        address: ETH_ADDRESS,
        balance: ethBalance,
        price: erc20Prices?.[`ethereum:${ETH_ADDRESS}`]?.price ?? 0,
        decimals: erc20Prices?.[`ethereum:${ETH_ADDRESS}`]?.decimals ?? 0,
        symbol: erc20Prices?.[`ethereum:${ETH_ADDRESS}`]?.symbol ?? "",
      });
    }
  });

  console.log(erc20);

  return erc20;
};
