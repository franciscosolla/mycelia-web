import { UserRoundPlus } from "lucide-react";
import { useAccountStore } from "../hooks/useAccountStore";
import { useTotalBalance } from "../hooks/useTotalBalance";
import { Title } from "./Title";

export const Accounts = () => {
  const accountsLength = useAccountStore((state) => state.accounts.length);
  const totalBalance = useTotalBalance();

  return (
    <div className="bg-candy-500 p-4 rounded-md m-2 font-bold flex flex-col gap-3">
      <div className="flex items-start">
        <div className="flex-1 flex flex-col gap-1.5">
          <h1 className="text-2xl text-stone-50">
            $
            {totalBalance.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </h1>
        </div>
        <button className="flex items-center gap-2 whitespace-nowrap">
          <UserRoundPlus className="text-stone-50" size={18} />
        </button>
      </div>
      <div className="flex flex-row gap-2">
        {new Array(accountsLength).fill(0).map((_, index) => (
          <Account key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

const Account = ({ index }: { index: number }) => {
  const account = useAccountStore((state) => state.accounts[index]);
  const totalBalance = useTotalBalance();

  return (
    <div className="flex flex-col bg-stone-50 rounded-md p-3">
      <Title index={index} />
      <h1 className="text-md text-stone-950">
        ${totalBalance.toLocaleString("en-US", { maximumFractionDigits: 2 })}
      </h1>
    </div>
  );
};
