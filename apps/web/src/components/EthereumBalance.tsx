"use client";
import { useBalance } from "@/hooks/useBalance";
import type { Address } from "viem";
import { Token } from "./Token";

export const EthereumBalance = ({ address }: { address: Address }) => {
  const { tokens, totalUsd } = useBalance(address);

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col">
        <h2 className="text-stone-50 text-sm">Total</h2>
        <h3 className="text-2xl font-bold text-stone-50">
          {`$${totalUsd}`.slice(0, 10)}
        </h3>
      </header>
      <main className="flex flex-row gap-2 overflow-x-scroll scrollbar-hidden">
        {tokens?.map(({ tokenAddress, balance, coin }) => (
          <Token
            key={tokenAddress as string}
            tokenAddress={tokenAddress as Address}
            balance={balance}
            usdPrice={coin?.price}
          />
        ))}
      </main>
    </section>
  );
};
