import { Account } from "@/components/Account";
import Link from "next/link";
import { Logo } from "./Logo";

export const Header = () => (
  <header className="flex flex-row justify-between items-center p-2">
    <div className="flex flex-row gap-4 items-center">
      <Logo />
      <Link href="/explorer" className="text-stone-50 hover:underline">
        Explorer
      </Link>
    </div>
    <Account />
  </header>
);
