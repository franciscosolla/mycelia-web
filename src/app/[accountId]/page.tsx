"use client";
import { EthereumBalance } from "@/components/EthereumBalance";
import { useAccount } from "@/features/accounts/hooks/useAccount";
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
      <main className="flex flex-col flex-1 pt-4 px-2">
        {account ? <EthereumBalance address={account.ethereum} /> : null}
      </main>
    </>
  );
}
