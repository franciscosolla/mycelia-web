"use client";

import { useRef } from "react";
import { Modal } from "../../components/Modal";
import { Option } from "./Option";

export const ImportOption = () => {
  const modalRef = useRef<Modal>(null);

  return (
    <>
      <Option
        icon="key"
        title="Import"
        onClick={() => modalRef.current?.open()}
      >
        Import an existing wallet
      </Option>
      <Modal ref={modalRef}>
        <div className="max-w-80 flex flex-col">
          <h2 className="text-lg font-semibold text-stone-50">
            🔑 Import a Wallet
          </h2>
          <p className="text-stone-400 text-sm w-full text-left mt-2 pl-1">
            Enter your private key or seed phrase to import an existing wallet.
          </p>
          <button className="mt-4 w-full p-2 bg-stone-600 text-stone-50 rounded-lg hover:bg-stone-500 transition-all duration-400">
            Import
          </button>
        </div>
      </Modal>
    </>
  );
};
