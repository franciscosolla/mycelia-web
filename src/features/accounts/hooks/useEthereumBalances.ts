import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";
import { usePublicClient } from "wagmi";

export const useEthereumBalances = (addresses: Address[]) => {
  const client = usePublicClient();

  return useQuery({
    queryKey: ["ethereum", "balance"],
    queryFn: () =>
      Promise.all(addresses.map((address) => client?.getBalance({ address }))),
    enabled: addresses.length > 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
