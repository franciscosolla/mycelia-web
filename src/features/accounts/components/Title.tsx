"use client";

import { Check, Copy } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAccountStore } from "../hooks/useAccountStore";

export const Title = ({ index }: { index: number }) => {
  const account = useAccountStore((state) => state.accounts[index]);
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) =>
      setOpen(!!ref.current?.contains(e.target as Node));

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const menuRef = useRef<HTMLDivElement>(null);

  const [tranlateX, setTranslateX] = useState(0);

  useEffect(() => {
    if (!menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    if (rect.right > viewportWidth) {
      const overflow = rect.right - viewportWidth;
      setTranslateX(overflow + 8);
    }
  }, []);

  return (
    <div className="group relative cursor-pointer w-fit" onClick={toggle}>
      <h2 ref={ref} className="text-sm text-stone-950 flex items-center gap-4">
        {account.name ?? `Account ${index}`} <Copy size={14} />
      </h2>
      <div
        ref={menuRef}
        className={`${
          open ? "" : "opacity-0 pointer-events-none"
        } group-hover:opacity-100 group-hover:pointer-events-auto absolute top-full pt-2 z-50`}
        style={{
          translate: `-${tranlateX}px 0px`,
        }}
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
