"use client";

import Image from "next/image";
import { useRef, type PropsWithChildren } from "react";
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

  return (
    <>
      <Option
        icon="/icons/eye.svg"
        title="Explore"
        onClick={() => modalRef.current?.open()}
      >
        Follow any public wallet address
      </Option>
      <Modal ref={modalRef}>Explore</Modal>
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
