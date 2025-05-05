"use client";
import { useAccount, useBalance } from "wagmi";

export const Balance = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  console.log({
    address,
    balance,
  });

  if (!balance) {
    return null;
  }

  return (
    <h2 className="text-2xl font-bold px-2 text-stone-50">
      {balance.formatted + balance.symbol}
    </h2>
  );
};
