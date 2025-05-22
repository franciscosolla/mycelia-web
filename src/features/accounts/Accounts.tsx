"use client";
import { useAccount } from "@/features/accounts/useAccount";
import { useAccounts } from "@/features/accounts/useAccounts";
import { useRemoveAccount } from "@/features/accounts/useRemoveAccount";
import { MoveLeft, Power } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { AccountButton } from "./AccountButton";

export const Accounts = () => {
  const { accounts } = useAccounts();
  const accountId = useParams<{ accountId: string }>().accountId || "";
  const { account } = useAccount(accountId);
  const { removeAccount } = useRemoveAccount();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    dialogRef.current?.showModal();
  };

  console.log({
    accounts,
    account,
    accountId,
  });

  return (
    <>
      {account ? (
        <AccountButton account={account} onClick={handleClick} />
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
              <div className="flex flex-col gap-2">
                {[...accounts.values()].map((account) => (
                  <AccountButton key={account.name} account={account} />
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
                <Power onClick={() => removeAccount(accountId)} />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
