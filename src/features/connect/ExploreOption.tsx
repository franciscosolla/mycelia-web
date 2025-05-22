"use client";

import { detectAddressNetwork } from "@/lib/detectAddressNetwork";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEventHandler } from "react";
import { Modal } from "../../components/Modal";
import { addWallet } from "../wallet/addWallet";
import { Option } from "./Option";

export const ExploreOption = () => {
  const modalRef = useRef<Modal>(null);

  const [address, setAddress] = useState<string>();

  const [network, setNetwork] =
    useState<ReturnType<typeof detectAddressNetwork>>();

  const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
    const input = e.currentTarget.value;
    setAddress(input);
    setNetwork(detectAddressNetwork(input));
  };

  const router = useRouter();

  const handleConfirm = () => {
    if (network && address) {
      addWallet({
        address,
      });

      router.push(`/wallet/${address}`);
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
          <p className="text-stone-400 text-sm w-full text-left mt-2 pl-1">
            Enter any wallet address to view tokens, NFTs, and transactions.
            <span className="text-stone-400 text-xs w-full block text-left mt-1">
              (You won`t be able to sign or send.)
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
          <span className="text-stone-400 text-xs w-full block text-left mt-1 pl-1">
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
