"use client";
import { useMemo, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

export function Account() {
  const { isConnected, address, chain } = useAccount();
  const { disconnect } = useDisconnect();

  const minifiedAddress = useMemo(
    () => address?.slice(0, 6) + "..." + address?.slice(-4),
    [address]
  );

  const [tooltip, setTooltip] = useState("Copy");

  const [isOpen, setOpen] = useState(false);

  if (!isConnected || !address) {
    return null;
  }

  return (
    <button
      className="group absolute right-2 top-2 flex flex-col gap-1 bg-stone-50 p-2 rounded-md items-end"
      onClick={() => setOpen((value) => !value)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="group/address text-xs text-stone-950 relative"
        onClick={(e) => {
          if (isOpen) {
            e.stopPropagation();

            navigator.clipboard.writeText(address).then(() => {
              setTooltip("Copied!");
              setTimeout(() => setTooltip("Copy"), 2000);
            });
          }
        }}
      >
        {minifiedAddress}
        <span
          className={`hidden group-hover/address:block group-hover/address:opacity-90 opacity-0 absolute right-full -top-0.5 bg-stone-500 py-1 px-1.5 text-[10px] mr-1 rounded-sm text-stone-50 font-bold`}
        >
          {tooltip}
        </span>
      </button>

      {chain ? (
        <span
          className={`${
            isOpen ? "block" : "hidden"
          } group-hover:block text-xs text-stone-950`}
        >
          {chain?.name}
        </span>
      ) : null}

      <button
        className={`${
          isOpen ? "block" : "hidden"
        } group-hover:block text-xs text-red-400 weight-bold`}
        onClick={() => {
          disconnect();
        }}
      >
        Disconnect
      </button>
    </button>
  );
}
