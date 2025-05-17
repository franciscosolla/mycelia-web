"use client";
import { Balance } from "@/components/Balance";
import type { Account } from "@/features/accounts/types";
import { useAccount } from "@/features/accounts/useAccount";
import { useAccounts } from "@/features/accounts/useAccounts";
import { useRemoveAccount } from "@/features/accounts/useRemoveAccount";
import { MoveLeft, Power } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useMemo, useRef } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const router = useRouter();
  const { accountId } = use(params);
  const { account } = useAccount(Number(accountId));

  if (!account) {
    router.push("/beta");
  }

  return (
    <>
      <header className="flex flex-row items-center justify-end p-2">
        <Accounts />
      </header>

      <main className="flex flex-col flex-1 pt-4 px-2">
        {account ? <Balance account={account} /> : null}
      </main>
    </>
  );
}

const Accounts = () => {
  const { accounts } = useAccounts();
  const { account, accountId } = useAccount();
  const { removeAccount } = useRemoveAccount();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      {account ? (
        <Account account={account} id={accountId} onClick={handleClick} />
      ) : null}
      <dialog ref={dialogRef} className="bg-transparent">
        <div
          className="fixed inset-2"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              dialogRef.current?.close();
            }
          }}
        >
          <div className="bg-stone-950 shadow-md w-fit p-2 fixed right-2 top-2 bottom-2 flex flex-col items-center justify-between">
            <div className="flex flex-col gap-4 items-center">
              <button
                className="text-stone-50"
                onClick={() => {
                  dialogRef.current?.close();
                }}
              >
                <MoveLeft />
              </button>
              <div>
                {accounts.map((account, id) => (
                  <Account
                    key={`${account.name ?? "account"}-${id}`}
                    account={account}
                    id={id}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <button
                className="text-stone-50"
                onClick={() => {
                  dialogRef.current?.close();
                }}
              >
                <Power onClick={() => removeAccount()} />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

const Account = ({
  account,
  id,
  onClick,
}: {
  account: Account;
  id: number;
  onClick?: () => void;
}) => {
  const symbol = useMemo(
    () => `${account.name ? account.name.toUpperCase() : `A${id}`}`.slice(0, 2),
    [account.name, id]
  );
  return (
    <button
      className="bg-stone-900 rounded-full p-4 text-stone-50"
      onClick={onClick}
    >
      {symbol}
    </button>
  );
};
