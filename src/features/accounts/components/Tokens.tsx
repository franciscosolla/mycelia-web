"use client";

import { Token } from "@/components/Token";
import groupBy from "lodash/groupBy";
import mapValues from "lodash/mapValues";
import omitBy from "lodash/omitBy";
import sumBy from "lodash/sumBy";
import type { Address } from "viem";
import { useBalance } from "../hooks/useBalance";

export const Tokens = () => {
  const balances = useBalance();

  const tokens = omitBy(
    mapValues(
      groupBy(Object.values(balances).flat(), "address"),
      (tokenBalances) => [
        sumBy(tokenBalances, "balance"),
        tokenBalances[0].price,
      ]
    ),
    ([, usdPrice]) => usdPrice === 0
  );

  return (
    <div className="flex gap-1 overflow-x-scroll no-scrollbar">
      {Object.entries(tokens)
        .sort(([, [, a]], [, [, b]]) => b - a)
        .map(([address, [balance, usdPrice]]) => (
          <Token
            key={address}
            tokenAddress={address as Address}
            balance={balance}
            usdPrice={usdPrice}
          />
        ))}
    </div>
  );
};
