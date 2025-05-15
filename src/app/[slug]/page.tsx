"use client";
import { Balance } from "@/components/Balance";
import { Header } from "@/components/Header";
import { useAccount } from "@/hooks/useAccount";

export default function Account() {
  const { account } = useAccount();

  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 pt-4 px-2">
        <Balance account={account} />
      </main>
    </>
  );
}
