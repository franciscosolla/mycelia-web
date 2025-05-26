"use client";

import { Check, Copy, Menu, UserRoundPlus, UserRoundX } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAccountStore } from "../hooks/useAccountStore";
import { useTotalBalance } from "../hooks/useTotalBalance";
import type { Account as AccountType } from "../types";

export const Account = () => {
  const account = useAccountStore((state) => state.accounts[0]);
  const totalBalance = useTotalBalance();

  return (
    <div className="bg-candy-500 p-4 rounded-md m-2 font-bold flex items-start">
      <div className="flex-1 flex flex-col gap-1.5">
        <Addresses account={account} />
        <h1 className="text-2xl text-stone-50">
          ${totalBalance.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        </h1>
      </div>
      <Options account={account} />
    </div>
  );
};

const Options = ({ account }: { account: AccountType }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) =>
      setOpen(!!ref.current?.contains(e.target as Node));

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const removeAccount = useAccountStore.use.removeAccount();

  return (
    <div
      className="group relative cursor-pointer w-fit text-stone-50"
      onClick={toggle}
    >
      <Menu ref={ref} size={18} />
      <div
        className={`${
          open ? "" : "hidden"
        } group-hover:block absolute -top-1 right-full pr-2`}
      >
        <article className="bg-stone-950 p-2 rounded-md flex flex-col gap-2 shadow text-xs">
          <button className="flex items-center gap-2 whitespace-nowrap">
            <UserRoundPlus size={18} /> Add account
          </button>
          <button
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={() => removeAccount(account)}
          >
            <UserRoundX size={18} /> Remove account
          </button>
        </article>
      </div>
    </div>
  );
};

const Addresses = ({ account }: { account: AccountType }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) =>
      setOpen(!!ref.current?.contains(e.target as Node));

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="group relative cursor-pointer w-fit" onClick={toggle}>
      <h2 ref={ref} className="text-lg text-stone-200 flex items-center gap-1">
        Solla <Copy size={16} />
      </h2>
      <div
        className={`${
          open ? "" : "hidden"
        } group-hover:block absolute -top-1 left-full pl-2`}
      >
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
