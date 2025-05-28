import { AccountSection } from "@/features/accounts/components/AccountSection";
import { Coins } from "@/features/accounts/components/Coins";
import { Connect } from "@/features/connect/Connect";

export default function Beta() {
  return (
    <>
      <header>
        <AccountSection />
      </header>
      <main className="flex flex-col flex-1 pt-4 px-2 justify-between">
        <Coins />
        <Connect />
      </main>
    </>
  );
}

// DEFAULT: '#9b87f5',
// dark: '#7E69AB',
// light: '#E5DEFF',
