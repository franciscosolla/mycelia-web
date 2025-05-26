"use client";

import groupBy from "lodash/groupBy";
import mapValues from "lodash/mapValues";
import omitBy from "lodash/omitBy";
import sumBy from "lodash/sumBy";
import { useBalance } from "../hooks/useBalance";
import { toPrice } from "../lib/toPrice";
import { Coin } from "./Coin";

export const Coins = () => {
  const balances = useBalance();

  const coins = omitBy(
    mapValues(
      groupBy(Object.values(balances).flat(), "address"),
      (tokenBalances) => [
        sumBy(tokenBalances, "value"),
        sumBy(tokenBalances, toPrice),
      ]
    ),
    ([, usdPrice]) => usdPrice === 0
  );

  return (
    <div className="flex gap-2 overflow-x-scroll no-scrollbar">
      {Object.entries(coins)
        .sort(([, [, a]], [, [, b]]) => b - a)
        .map(([address, [value, usdPrice]]) => (
          <Coin key={address} address={address} value={value} usd={usdPrice} />
        ))}
    </div>
  );
};
