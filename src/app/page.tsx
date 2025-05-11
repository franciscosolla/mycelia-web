import { Account } from "@/lib/Account";
import { Balance } from "@/lib/Balance";
import { ConnectWallet } from "@/lib/ConnectWallet";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="flex flex-row justify-between items-center p-2">
        <h1 className="text-xl font-bold text-stone-50 flex flex-row items-center gap-2">
          <Image src="/logo-dark.webp" alt="Mycelia" width={24} height={24} />
          MYCELIA
        </h1>
        <Account />
      </header>
      <main className="flex flex-col flex-1">
        <Balance />
        <div className="flex-1" />
        <ConnectWallet />
      </main>
    </>
  );
}
