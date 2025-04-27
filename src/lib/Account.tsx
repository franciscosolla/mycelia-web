"use client";
import { useMemo } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useToggle } from "./useToggle";

export function Account() {
  const { isConnected, address, chain } = useAccount();
  const { disconnect } = useDisconnect();

  const minifiedAddress = useMemo(
    () => address?.slice(0, 6) + "..." + address?.slice(-4),
    [address]
  );

  const [isOpen, toggle] = useToggle();

  if (!isConnected) {
    return null;
  }

  return (
    <button
      className="absolute right-2 top-2 flex flex-col gap-1 bg-stone-800 p-2 rounded-md items-end"
      onClick={toggle}
    >
      {address ? <p className="text-xs">{minifiedAddress}</p> : null}

      {isOpen ? (
        <>
          {chain ? <p className="text-xs">{chain?.name}</p> : null}
          <button
            className="text-xs text-red-400 weight-bold"
            onClick={() => {
              disconnect();
              toggle();
            }}
          >
            Disconnect
          </button>
        </>
      ) : null}
    </button>
  );
}
