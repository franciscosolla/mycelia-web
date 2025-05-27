"use client";

import { groupBy, sumBy } from "@/lib/utils";
import { useMemo } from "react";
import { useBalance } from "../hooks/useBalance";
import { toPrice } from "../lib/toPrice";
import { Coin } from "./Coin";

export const Coins = () => {
  const balances = useBalance();

  const coins = useMemo(
    () =>
      Object.entries(groupBy(Object.values(balances).flat(), "address"))
        .map(([address, tokenBalances]) => ({
          address,
          value: sumBy(tokenBalances, "value"),
          usd: sumBy(tokenBalances, toPrice),
        }))
        .sort(({ usd: a }, { usd: b }) => b - a),
    [balances]
  );

  return (
    <div className="flex gap-2 overflow-x-scroll no-scrollbar">
      {coins.map(({ address, value, usd }) => (
        <Coin key={address} address={address} value={value} usd={usd} />
      ))}
    </div>
  );
};
