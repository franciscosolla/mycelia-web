"use client";
import { useMemo } from "react";
import { useAccount, useDisconnect } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const minifiedAddress = useMemo(
    () => address?.slice(0, 6) + "..." + address?.slice(-4),
    [address]
  );

  return (
    <button
      className="flex flex-row bg-stone-800 p-2 rounded-md"
      onClick={() => disconnect()}
    >
      {address && <p className="text-xs">{minifiedAddress}</p>}
    </button>
  );
}
