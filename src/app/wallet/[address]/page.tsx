"use client";
import { EthereumBalance } from "@/components/EthereumBalance";
import { use } from "react";
import type { Address } from "viem";

export default function Page({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = use(params);

  return (
    <>
      <main className="flex flex-col flex-1 pt-4 px-2">
        {address ? <EthereumBalance address={address as Address} /> : null}
      </main>
    </>
  );
}
