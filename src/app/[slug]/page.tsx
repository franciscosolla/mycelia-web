"use client";
import { Balance } from "@/components/Balance";
import { useAccount } from "@/features/accounts/useAccount";

export default function Account() {
  const { account } = useAccount();

  return (
    <>
      <main className="flex flex-col flex-1 pt-4 px-2">
        <Balance account={account} />
      </main>
    </>
  );
}
