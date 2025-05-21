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
        <ImportModal />
      </Modal>
    </>
  );
};

const ImportModal = () => {
  return (
    <div>
      <h2>Recovery Phrase</h2>
      <p className="mt-1">
        Import wallets from an existing account with your 12-word recovery
        phrase
      </p>
      <div className="grid grid-cols-3 gap-2 min-w-90 mt-4">
        {new Array(12).fill(null).map((_, index) => (
          <div
            key={`word-${index}`}
            className="bg-stone-950 border rounded-md p-2 flex items-center border-stone-600 gap-1 has-focus:border-stone-300 text-stone-600  has-focus:text-stone-300"
            onKeyDown={(e) => {
              if (index !== 11 && ["Enter", "Space", "Tab"].includes(e.key)) {
                const input = document.getElementById(
                  `input-${index}`
                ) as HTMLInputElement;

                input.focus();
              }
            }}
          >
            <span className="text-sm font-bold">{`${index + 1}.`}</span>
            <div className="flex-1 overflow-x-scroll no-scrollbar">
              <input
                id={`input-${index}`}
                type="text"
                className="w-max"
                onChange={handleInput}
                onKeyDown={(e) => {
                  if (
                    index !== 11 &&
                    ["Enter", "Space", "Tab"].includes(e.key)
                  ) {
                    const input = document.getElementById(
                      `input-${index}`
                    ) as HTMLInputElement;

                    input.focus();
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {}}
        className="mt-4 w-full p-2 bg-stone-600 text-stone-50 rounded-lg hover:bg-stone-500 transition-all duration-400"
      >
        Add account
      </button>
    </div>
  );
};

const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.currentTarget.value;
  const words = value.trimStart().split(" ");

  e.currentTarget.value = words.shift()?.trim() || "";

  let nextIndex = parseInt(e.currentTarget.id.split("-")[1], 10) + 1;

  while (words.length) {
    const nextInput = document.getElementById(
      `input-${nextIndex}`
    ) as HTMLInputElement;

    if (nextInput) {
      nextInput.focus();
      nextInput.value = words.shift()?.trim() ?? "";
      nextIndex++;
    }
  }
};
