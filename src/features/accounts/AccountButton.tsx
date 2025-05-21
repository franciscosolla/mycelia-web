"use client";
import type { Account } from "@/features/accounts/types";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const AccountButton = ({
  account,
  onClick,
}: {
  account: Account;
  onClick?: () => void;
}) => {
  return (
    <div className="group relative text-stone-950">
      <button
        className="bg-stone-50 rounded-full p-4 aspect-square text-center flex flex-col items-center justify-center font-black"
        onClick={onClick}
      >
        {account.symbol}
      </button>
      <div className="group-hover:block hidden absolute top-0 right-full pr-2 text-stone-50">
        <article className="flex flex-col gap-2 bg-stone-900 rounded-sm p-2 text-sm">
          <h1 className="text-center font-bold">{account.name}</h1>
          <Network network="ethereum" address={account.ethereum} />
        </article>
      </div>
    </div>
  );
};

const Network = ({
  network,
  address,
}: {
  network: string;
  address: string | undefined;
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!address) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
  };

  return (
    <div className="flex flex-row gap-1 items-center justify-between">
      <Image
        src={`/icons/${network}.svg`}
        alt={network}
        width={24}
        height={24}
        className="rounded-full"
      />
      <h2 className="text-sm font-bold">{network}</h2>
      <div className="flex-1 w-4" />
      <button
        className="text-sm font-bold flex flex-row items-center gap-1"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            Copied! <Check size={14} />
          </>
        ) : (
          <>
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
            <Copy size={14} />
          </>
        )}
      </button>
    </div>
  );
};
