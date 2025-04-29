"use client";
import { useAccount } from "wagmi";

export const Actions = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return null;
  }

  return (
    <section>
      <ul>
        <li>
          <button className="flex flex-col justify-end p-2 min-w-40 min-h-22 bg-stone-800 text-stone-50 rounded-2xl border-2 border-stone-800 hover:border-stone-600 transition-all duration-400 active:opacity-80 text-left text-lg">
            Send
          </button>
        </li>
      </ul>
    </section>
  );
};
