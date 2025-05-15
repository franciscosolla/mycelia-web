"use client";

import { useAddAccount } from "@/hooks/useAccount";
import { detectAddressNetwork } from "@/lib/detectAddressNetwork";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, type PropsWithChildren } from "react";
import { Modal } from "./Modal";

export const Connect = () => {
  return (
    <section className="flex flex-row flex-wrap gap-2 p-2">
      <ExploreOption />
    </section>
  );
};

const Option = ({
  icon,
  title,
  onClick,
  children,
}: PropsWithChildren<{
  icon: string;
  title: string;
  onClick: () => void;
}>) => (
  <button
    onClick={onClick}
    className="relative flex flex-col justify-end p-2 w-32 h-32 bg-stone-800 text-stone-50 rounded-2xl border-2 border-stone-800 hover:border-stone-600 transition-all duration-400 active:opacity-80"
  >
    <Image
      src={icon}
      alt={`${title} icon`}
      className="w-12 h-12 rounded-lg absolute top-2 left-2"
      width={12}
      height={12}
    />

    {children ? (
      <p className="text-xs text-stone-400 text-left">{children}</p>
    ) : null}

    <h3 className="text-left text-md font-medium">{title}</h3>
  </button>
);

const ExploreOption = () => {
  const modalRef = useRef<Modal>(null);
  const [address, setAddress] = useState<string>();
  const [network, setNetwork] =
    useState<ReturnType<typeof detectAddressNetwork>>();
  const { addAccount } = useAddAccount();

  const handleInput = (e) => {
    const input = e.currentTarget.value;
    setAddress(input);
    setNetwork(detectAddressNetwork(input));
  };

  const router = useRouter();

  const handleConfirm = () => {
    if (network) {
      const id = addAccount({
        [network]: address,
      });

      router.push(`/${id}`);
    }
  };

  return (
    <>
      <Option
        icon="/icons/eye.svg"
        title="Explore"
        onClick={() => modalRef.current?.open()}
      >
        Follow any public wallet address
      </Option>
      <Modal ref={modalRef}>
        <div className="max-w-80 flex flex-col">
          <h2 className="text-lg font-semibold text-stone-50">
            🔍 Explore a Wallet
          </h2>
          <p className="text-stone-400 text-sm text-center w-full text-left mt-2 pl-1">
            Enter any wallet address to view tokens, NFTs, and transactions.
            <span className="text-stone-400 text-xs text-center w-full block text-left mt-1">
              (You won't be able to sign or send.)
            </span>
          </p>
          <div className="flex flex-row items-center mt-4 w-full p-2 bg-stone-900 text-stone-50 rounded-lg border border-stone-800 focus:border-stone-600">
            <input
              type="text"
              placeholder="Enter wallet address"
              className="flex-1 focus:outline-none"
              onInput={handleInput}
            />
            <div className="w-[18px] h-[18px] ml-2">
              {network ? (
                <Image
                  src={`/icons/${network}.svg`}
                  alt={network}
                  width={18}
                  height={18}
                />
              ) : null}
            </div>
          </div>
          <span className="text-stone-400 text-xs text-center w-full block text-left mt-1 pl-1">
            Ethereum, Solana or Bitcoin
          </span>
          <button
            onClick={handleConfirm}
            className="mt-4 w-full p-2 bg-stone-600 text-stone-50 rounded-lg hover:bg-stone-500 transition-all duration-400"
            disabled={!network}
          >
            Add wallet
          </button>
        </div>
      </Modal>
    </>
  );
};

const options: ConnectOption[] = [
  {
    icon: "/icons/eye.svg",
    title: "Explore",
    description: "Follow any public wallet address",
    onClick: () => {
      // Handle explore action
    },
  },
  {
    icon: "/metamask-logo.svg",
    title: "MetaMask",
    onClick: () => {
      // Handle MetaMask connection
    },
  },
  {
    icon: "/phantom-logo.svg",
    title: "Phantom",
    onClick: () => {
      // Handle Phantom Wallet connection
    },
  },
  {
    icon: "/coinbase-logo.svg",
    title: "Coinbase",
    onClick: () => {
      // Handle Coinbase Wallet connection
    },
  },
  {
    icon: "/kraken-logo.svg",
    title: "Kraken",
    onClick: () => {
      // Handle Kraken Wallet connection
    },
  },
];

type ConnectOption = {
  icon: string;
  title: string;
  description?: string;
  onClick: () => void;
};
