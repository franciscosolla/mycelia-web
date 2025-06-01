"use client";
import { useAccountStore } from "@/features/accounts/hooks/useAccountStore";
import { useCoinBalances } from "@/features/accounts/hooks/useCoinBalances";
import { useTotalBalance } from "@/features/accounts/hooks/useTotalBalance";
import { useTokenMetadata } from "@/hooks/useTokenMetadata";
import clsx from "clsx";
import { ChevronDown, ListFilter, Plus, User } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, type MouseEventHandler } from "react";
import type { Address } from "viem";

export default function Account() {
  const account = useAccountStore.use.current();
  const [tab, setTab] = useState<"coins" | "defi" | "nfts">("coins");

  if (!account) {
    redirect("/");
  }

  return (
    <main className="flex flex-1 flex-col justify-end">
      <div className="p-6 flex flex-col items-end gap-4">
        <div className="w-full flex flex-col gap-5 items-end">
          <Coins />
          <div className="flex gap-1">
            <Tab
              label="Coins"
              disabled={tab === "coins"}
              onClick={() => setTab("coins")}
            />
            <Tab
              label="DeFi"
              disabled={tab === "defi"}
              onClick={() => setTab("defi")}
            />
            <Tab
              label="NFTs"
              disabled={tab === "nfts"}
              onClick={() => setTab("nfts")}
            />
          </div>
        </div>
        <header className="flex items-center justify-between w-full">
          <div className="flex items-end">
            {account.name ? <h1>{account.name}</h1> : null}
            <div className="size-23.5 bg-theme-100 rounded-full flex items-center justify-center text-theme-800">
              <User size={55} />
            </div>
            <button className="size-6 bg-theme-50 rounded-full flex items-center justify-center -mt-5 -ml-8 text-theme-800">
              <ChevronDown size={19} />
            </button>
          </div>
          <div className="flex flex-col gap-3 items-end">
            <TotalBalance />
            <div className="flex gap-4">
              <button className="flex">
                <Image
                  src="/icons/bitcoin.svg"
                  width={24}
                  height={24}
                  alt="Bitcoin Icon"
                  className="-ml-2"
                />
                <Image
                  src="/icons/ethereum.svg"
                  width={24}
                  height={24}
                  alt="Ethereum Icon"
                  className="-ml-2"
                />
                <Image
                  src="/icons/solana.svg"
                  width={24}
                  height={24}
                  alt="Solana Icon"
                  className="-ml-2"
                />
              </button>
              <div className="flex gap-2">
                <button>
                  <ListFilter size={24} />
                </button>
                <button>
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="px-6 pb-6 pt-2 flex flex-col items-center border-t border-white rounded-t-md bg-theme-50 dark:bg-theme-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button className="dark:bg-theme-100 bg-theme-800 rounded-full w-15 h-1 mb-4" />
        <nav className="flex gap-3 items-center justify-between">
          <ActionLink icon="banknote" href="/ramp" label="Buy/Sell" />
          <ActionLink icon="send-to-back" href="/swap" label="Swap" />
          <ActionLink icon="send-horizontal" href="/send" label="Send" />
          <ActionLink icon="scan-qr-code" href="/scan" label="Connect" />
        </nav>
      </div>
    </main>
  );
}

const Tab = ({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <button
    className={clsx(
      "px-2 py-1 font-medium border-t",
      disabled
        ? "border-theme-800 text-theme-800 dark:border-theme-50 dark:text-theme-50"
        : "border-theme-100 text-theme-100 dark:border-theme-800 dark:text-theme-800"
    )}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);

const ActionLink = ({
  icon,
  href,
  label,
}: {
  icon: IconName;
  href: string;
  label: string;
}) => (
  <Link
    href={href}
    className="bg-white rounded-full w-17 h-17 text-black flex flex-col items-center justify-center text-xs font-medium"
  >
    <DynamicIcon name={icon} size={30} />
    {label}
  </Link>
);

const TotalBalance = () => {
  const totalBalance = useTotalBalance();

  return (
    <div className="text-end">
      <h2 className="text-md font-semibold">Total balance</h2>
      <h1 className="text-4xl font-bold">
        ${totalBalance.toLocaleString("en-US", { maximumFractionDigits: 2 })}
      </h1>
    </div>
  );
};

const Coins = () => {
  const balances = useCoinBalances();

  return (
    <div className="flex flex-col-reverse gap-4 w-full">
      {balances.map((balance) => (
        <Coin key={balance.address} {...balance} />
      ))}
    </div>
  );
};

const Coin = ({
  address,
  value,
  usd,
}: {
  address: string;
  value: number;
  usd: number;
}) => {
  const { data: { logo, name, symbol } = {} } = useTokenMetadata(
    address as Address
  );

  return (
    <div className="flex gap-1 items-center font-medium">
      {logo ? (
        <Image
          src={logo}
          alt={`${name} Icon`}
          width={42}
          height={42}
          className="size-10.5"
        />
      ) : (
        <div className="size-10.5 rounded-full bg-theme-800" />
      )}
      <h1 className="text-lg">{name}</h1>
      <div className="text-right flex-1">
        <p className="text-md text-gray-500">
          {value.toFixed(4)} {symbol}
        </p>
        <p className="text-lg">${usd.toFixed(2)}</p>
      </div>
    </div>
  );
};
