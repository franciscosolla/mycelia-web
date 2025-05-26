"use client";
import sumBy from "lodash/sumBy";
import { toPrice } from "../lib/toPrice";
import { useBalance } from "./useBalance";

export const useTotalBalance = () => {
  const allBalances = useBalance();

  const totalBalance = sumBy(Object.values(allBalances), (balances) =>
    sumBy(balances, toPrice)
  );

  return totalBalance;
};
