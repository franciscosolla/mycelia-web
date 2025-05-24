"use client";

import { Check, Copy, Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { useTotalBalance } from "../hooks/useTotalBalance";
import type { Account } from "../types";

export const AccountView = () => {
  const [accounts] = useAccounts();

  if (!accounts?.length) {
    return null;
  }

  const hasMultipleAccounts = accounts.length > 1;

  return hasMultipleAccounts ? (
    <Accounts accounts={accounts} />
  ) : (
    <Account account={accounts[0]} />
  );
};

const Accounts = ({ accounts }: { accounts: Account[] }) => {
  return (
    <div className="bg-candy-500 p-4 rounded-md m-2 font-bold flex">
      <div className="flex-1">
        <h2 className="text-sm text-stone-100">Solla</h2>
        <h1 className="text-xl text-stone-50">$68.82</h1>
      </div>
      <Addresses account={accounts[0]} />
    </div>
  );
};

const Account = ({ account }: { account: Account }) => {
  const totalBalance = useTotalBalance();

  return (
    <div className="bg-candy-500 p-4 rounded-md m-2 font-bold flex items-start">
      <div className="flex-1 flex flex-col gap-1.5">
        <Addresses account={account} />
        <h1 className="text-2xl text-stone-50">
          ${totalBalance.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        </h1>
      </div>
      <Menu className="text-stone-50" size={18} />
    </div>
  );
};

const Addresses = ({ account }: { account: Account }) => {
  return (
    <div className="group relative cursor-pointer w-fit">
      <h2 className="text-lg text-stone-200 flex items-center gap-1">
        Solla <Copy size={16} />
      </h2>
      <div className="hidden group-hover:block absolute -top-1 left-full pl-2">
        <article className="bg-stone-950 p-2 rounded-md text-stone-50 flex flex-col gap-2 shadow">
          <Network network="ethereum" address={account.ethereum} />
          <Network network="solana" address={account.solana} />
          <Network network="bitcoin" address={account.bitcoin} />
        </article>
      </div>
    </div>
  );
};

const Network = ({
  address,
  network,
}: {
  address: string | undefined;
  network: string;
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

  if (!address || !network) {
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
        width={18}
        height={18}
        className="rounded-full"
      />
      <h2 className="text-xs font-bold">{network}</h2>
      <div className="flex-1 w-10" />
      <button
        className="text-xs flex flex-row items-center gap-1 relative"
        onClick={handleCopy}
      >
        <div
          className={
            copied
              ? "absolute inset-0 flex items-center gap-1 justify-end"
              : "hidden"
          }
        >
          Copied! <Check size={14} />
        </div>
        <div className={`${copied ? "opacity-0" : ""} flex items-center gap-1`}>
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
          <Copy size={14} />
        </div>
      </button>
    </div>
  );
};
