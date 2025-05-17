"use client";
import type { Account } from "@/features/accounts/types";
import { useMemo } from "react";

export const AccountButton = ({
  account,
  id,
  onClick,
}: {
  account: Account;
  id: number;
  onClick?: () => void;
}) => {
  const symbol = useMemo(
    () => `${account.name ? account.name.toUpperCase() : `A${id}`}`.slice(0, 2),
    [account.name, id]
  );
  return (
    <button
      className="bg-stone-900 rounded-full p-4 text-stone-50"
      onClick={onClick}
    >
      {symbol}
    </button>
  );
};
