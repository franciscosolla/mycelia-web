import { Account } from "@/components/Account";
import { Logo } from "./Logo";

export const Header = () => (
  <header className="flex flex-row justify-between items-center p-2">
    <Logo />
    <Account />
  </header>
);
