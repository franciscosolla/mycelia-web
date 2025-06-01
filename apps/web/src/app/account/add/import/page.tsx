"use client";

import { useAccountStore } from "@/features/accounts/hooks/useAccountStore";
import { getAccountFromMnemonic } from "@/features/accounts/lib/getAccountFromMnemonic";
import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useState,
  type KeyboardEventHandler,
  type MouseEventHandler,
} from "react";

export default function Page() {
  const [phrase, setPhrase] = useState<string[]>(Array(12).fill(""));
  const addAccount = useAccountStore.use.addAccount();
  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const words = value.trimStart().split(" ");

    let index = parseInt(e.currentTarget.id.split("-")[1], 10);
    let word = words.shift()?.trim() || "";

    setPhrase((prev) => {
      const newPhrase = [...prev];
      newPhrase[index] = word || "";

      while (words.length && index < 11) {
        index += 1;
        word = words.shift()?.trim() || "";

        newPhrase[index] = word || "";
      }

      const nextInput = document.getElementById(
        `input-${index}`
      ) as HTMLInputElement;

      if (nextInput) {
        nextInput.focus();
      }

      return newPhrase;
    });
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (phrase.length === 12) {
      const mnemonic = phrase.join(" ").trim();
      addAccount(getAccountFromMnemonic(mnemonic));
      router.push("/account");
    } else {
      alert("Please enter a valid 12-word seed phrase.");
    }
  };

  const handleKeyDown =
    (index: number): KeyboardEventHandler<HTMLInputElement> =>
    (e) => {
      if (index !== 11 && ["Enter", "Space", "Tab"].includes(e.key)) {
        const input = document.getElementById(
          `input-${index}`
        ) as HTMLInputElement;

        input.focus();
      }
    };

  return (
    <main className="p-6">
      <h1 className="text-lg font-semibold">Seed Phrase</h1>
      <p className="mt-1">
        Import wallets from an existing account with your 12-word seed phrase
      </p>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {new Array(12).fill(null).map((_, index) => (
          <div
            key={`word-${index}`}
            className="bg-theme-100 rounded-md p-2 flex items-center gap-1 text-theme-800 drop-shadow-md"
            onKeyDown={handleKeyDown(index)}
          >
            <span className="text-sm font-bold">{`${index + 1}.`}</span>
            <div className="flex-1 overflow-x-scroll no-scrollbar">
              <input
                id={`input-${index}`}
                type="text"
                className="w-max text-xs outline-none"
                value={phrase[index] || ""}
                onChange={handleInput}
                onKeyDown={handleKeyDown(index)}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="flex gap-2 items-center justify-center mt-4 w-full p-2 bg-theme-100 text-theme-800 font-semibold rounded-lg drop-shadow-md"
      >
        <KeyRound size={18} />
        Import account
      </button>
    </main>
  );
}
