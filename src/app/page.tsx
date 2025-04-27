import { Account } from "@/lib/Account";
import { ConnectWallet } from "@/lib/ConnectWallet";

export default function Home() {
  return (
    <>
      <header className="flex flex-row justify-between items-center p-2">
        <h1 className="text-2xl font-bold">Mycelia</h1>
        <Account />
      </header>
      <main className="flex flex-col justify-end flex-1">
        <ConnectWallet />
      </main>
    </>
  );
}
