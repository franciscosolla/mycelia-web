"use client";
import { Balance } from "@/components/Balance";
import { Accounts } from "@/features/accounts/Accounts";
import { useAccount } from "@/features/accounts/useAccount";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const router = useRouter();
  const { accountId } = use(params);
  const { account } = useAccount(accountId);

  if (!account) {
    router.push("/beta");
  }

  return (
    <>
      <header className="flex flex-row items-center justify-end p-2">
        <Accounts />
      </header>

      <main className="flex flex-col flex-1 pt-4 px-2">
        {account ? <Balance account={account} /> : null}
      </main>
    </>
  );
}
