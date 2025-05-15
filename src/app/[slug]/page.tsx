import { Balance } from "@/components/Balance";
import { Connect } from "@/components/Connect";
import { Header } from "@/components/Header";

export default function Account() {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 pt-4 px-2">
        <Balance />
        <div className="flex-1" />
        <Connect />
      </main>
    </>
  );
}
