"use client";
import type { Account } from "@/features/accounts/types";
import { Copy } from "lucide-react";
import Image from "next/image";

export const AccountButton = ({
  account,
  onClick,
}: {
  account: Account;
  onClick?: () => void;
}) => {
  return (
    <div className="group relative text-stone-50">
      <button className="bg-stone-900 rounded-full p-4" onClick={onClick}>
        {account.symbol}
      </button>
      <div className="group-hover:block hidden absolute top-0 right-full pr-2">
        <article className="flex flex-col gap-2 bg-stone-900 rounded-sm p-2 text-sm">
          <h1 className="text-center font-bold">{account.name}</h1>
          {account.ethereum ? (
            <div className="flex flex-row gap-1 items-center justify-between">
              <Image
                src={`/icons/ethereum.svg`}
                alt={account.ethereum}
                width={24}
                height={24}
                className="rounded-full"
              />
              <h2 className="text-sm font-bold">Ethereum</h2>
              <div className="flex-1 w-4" />
              <button
                className="text-sm font-bold flex flex-row items-center gap-1"
                onClick={() => {
                  navigator.clipboard.writeText(account.ethereum);
                }}
              >
                {`${account.ethereum.slice(0, 6)}...${account.ethereum.slice(
                  0,
                  4
                )}`}
                <Copy size={14} />
              </button>
            </div>
          ) : null}
        </article>
      </div>
    </div>
  );
};
