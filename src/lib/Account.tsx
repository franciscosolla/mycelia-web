"use client";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div className="flex flex-row">
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && (
        <button className="text-xs" onClick={() => disconnect()}>
          {ensName ? `${ensName} (${address})` : address}
        </button>
      )}
    </div>
  );
}
