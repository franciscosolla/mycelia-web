import { groupBy, sumBy } from "@/lib/utils";
import { useMemo } from "react";
import { toPrice } from "../lib/toPrice";
import { useBalance } from "./useBalance";

export const useCoinBalances = () => {
  const balances = useBalance();

  return useMemo(
    () =>
      Object.entries(groupBy(Object.values(balances).flat(), "address"))
        .map(([address, tokenBalances]) => ({
          address,
          value: sumBy(tokenBalances, "value"),
          usd: sumBy(tokenBalances, toPrice),
        }))
        .filter(({ usd }) => usd > 0)
        .sort(({ usd: a }, { usd: b }) => b - a),
    [balances]
  );
};
