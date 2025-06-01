"use client";
import { isWalletInstalled, WALLETS, type Wallet } from "@/lib/wallets";
import Image from "next/image";
import { useMemo } from "react";
import { useAccount, useConnect, type Connector } from "wagmi";

export const ConnectWallet = () => {
  const { isConnected } = useAccount();
  return isConnected ? null : <WalletOptions />;
};

const WalletOptions = () => {
  const { connectors, connect } = useConnect();

  const connectorMap = useMemo(
    () =>
      connectors.reduce<Record<string, Connector>>(
        (acc, connector) => ({
          ...acc,
          [connector.id]: connector,
        }),
        {}
      ),
    [connectors]
  );

  const handleConnect = async (wallet: Wallet) => {
    const connector = connectorMap[wallet.connectorIds[0]];

    await connector.getProvider();

    connect({ connector });
  };

  const wallets = useMemo(
    () =>
      WALLETS.reduce<Wallet[]>((acc, wallet) => {
        if (isWalletInstalled(wallet)) {
          acc.unshift(wallet);
        } else {
          acc.push(wallet);
        }
        return acc;
      }, []),
    []
  );

  return (
    <section className="flex flex-col gap-4 mb-20">
      <h2 className="text-2xl font-bold px-2 text-stone-50">
        Tap into the network
      </h2>
      <ul className="flex flex-row gap-2 px-2 items-end overflow-x-scroll scrollbar-hidden">
        {wallets.map((wallet) => (
          <WalletOption
            key={wallet.name}
            wallet={wallet}
            onClick={() => handleConnect(wallet)}
          />
        ))}
      </ul>
    </section>
  );
};

const WalletOption = ({
  wallet,
  onClick,
}: {
  wallet: Wallet;
  onClick: () => void;
}) => {
  const isInstalled = isWalletInstalled(wallet);

  return (
    <li>
      <button
        onClick={onClick}
        className="relative flex flex-col justify-end p-2 min-w-32 min-h-32 bg-stone-800 text-stone-50 rounded-2xl border-2 border-stone-800 hover:border-stone-600 transition-all duration-400 active:opacity-80"
      >
        {isInstalled ? (
          <div className="absolute top-2 right-2 rounded-full bg-green-500 w-2 h-2" />
        ) : null}

        {wallet.icon ? (
          <Image
            src={wallet.icon}
            alt={`${wallet.name} logo`}
            className="w-12 h-12 rounded-lg absolute top-2 left-2"
            width={12}
            height={12}
          />
        ) : null}

        <h3 className="text-left text-md font-medium">{wallet.name}</h3>
      </button>
    </li>
  );
};
