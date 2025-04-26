"use client";

import { WalletConnect } from "@/lib/WalletConnect";
import { useWallet } from "@/lib/WalletContext";

export default function Home() {
  const { wallet } = useWallet();
  return wallet ? <Connected /> : <NotConnected />;
}

const NotConnected = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <WalletConnect />
    </main>
  );
};

const Connected = () => {
  return (
    <>
      <header className="flex flex-row justify-between items-center p-2">
        <h1 className="text-2xl font-bold">Mycelia</h1>
      </header>
    </>
  );
};
