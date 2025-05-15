import { Connect } from "@/components/Connect";
import { Header } from "@/components/Header";

export default function Beta() {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 pt-4 px-2 items-end justify-end">
        <Connect />
      </main>
    </>
  );
}
