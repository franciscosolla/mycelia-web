"use client";
import { useEffect, useState } from "react";
import { Connector, useAccount, useConnect } from "wagmi";

export const ConnectWallet = () => {
  const { isConnected } = useAccount();

  return isConnected ? null : <WalletOptions />;
};

const WalletOptions = () => {
  const { connectors, connect } = useConnect();

  return (
    <section className="flex flex-col gap-4 mb-20">
      <h2 className="text-2xl">Connect wallet to start</h2>
      <ul className="flex flex-row gap-2 items-end overflow-x-scroll no-scrollbar">
        {connectors.map((connector) => (
          <WalletOption
            key={connector.uid}
            connector={connector}
            onClick={() => connect({ connector })}
          />
        ))}
      </ul>
    </section>
  );
};

const WalletOption = ({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <li>
      <button
        disabled={!ready}
        onClick={onClick}
        className="flex flex-col justify-end p-2 min-w-40 min-h-22 bg-stone-800 text-stone-50 rounded-2xl border-2 border-stone-800 hover:border-stone-600 transition-all duration-400 active:opacity-80 text-left text-lg"
      >
        {connector.name}
      </button>
    </li>
  );
};
