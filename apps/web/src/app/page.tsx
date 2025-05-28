import { Balance } from "@/components/Balance";
import { ConnectWallet } from "@/components/ConnectWallet";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 pt-4 px-2">
        <Balance />
        <div className="flex-1" />
        <ConnectWallet />
      </main>
    </>
  );
}
