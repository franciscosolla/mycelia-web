import { AccountSection } from "@/features/accounts/components/AccountSection";
import { Tokens } from "@/features/accounts/components/Tokens";
import { Connect } from "@/features/connect/Connect";

export default function Beta() {
  return (
    <>
      <header>
        <AccountSection />
      </header>
      <main className="flex flex-col flex-1 pt-4 px-2 justify-between">
        <Tokens />
        <Connect />
      </main>
    </>
  );
}

// DEFAULT: '#9b87f5',
// dark: '#7E69AB',
// light: '#E5DEFF',
