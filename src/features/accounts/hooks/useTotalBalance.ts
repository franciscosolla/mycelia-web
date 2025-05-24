"use client";
import { useBalance } from "./useBalance";

export const useTotalBalance = () => {
  const erc20 = useBalance();

  const totalBalance = Object.values(erc20).reduce((acc, balances) => {
    acc += balances.reduce((acc, { balance, price, decimals }) => {
      const weightedBalance = Number(balance) / 10 ** decimals;
      return acc + weightedBalance * price;
    }, 0);

    return acc;
  }, 0);

  return totalBalance;
};
