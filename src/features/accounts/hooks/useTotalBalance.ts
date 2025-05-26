"use client";
import sumBy from "lodash/sumBy";
import { useBalance, type Balance } from "./useBalance";

export const useTotalBalance = () => {
  const allBalances = useBalance();

  const totalBalance = sumBy(Object.values(allBalances), (balances) =>
    sumBy(balances, calculateBalance)
  );

  return totalBalance;
};

const calculateBalance = ({ balance, price, decimals }: Balance) =>
  (Number(balance) / 10 ** decimals) * price;
