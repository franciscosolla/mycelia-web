"use client";
import { EthereumBalance } from "@/components/EthereumBalance";
import { Accounts } from "@/features/accounts/Accounts";
import { getEthereumAddress } from "@/features/accounts/getEthereumAddress";
import { use } from "react";
import type { Address } from "viem";

export default function Page({
  params,
}: {
  params: Promise<{ index: string }>;
}) {
  const { index } = use(params);
  const ethereumAddress = getEthereumAddress(index);

  return (
    <>
      <header className="flex flex-row items-center justify-end p-2">
        <Accounts />
      </header>

      <main className="flex flex-col flex-1 pt-4 px-2">
        {ethereumAddress ? (
          <EthereumBalance address={ethereumAddress as Address} />
        ) : null}
      </main>
    </>
  );
}
