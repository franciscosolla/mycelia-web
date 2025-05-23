"use client";

import type { Account } from "@/features/accounts/types";
import { useCallback } from "react";
import { useAccounts } from "./useAccounts";

export const useAddAccount = () => {
  const { setAccounts } = useAccounts();

  const addAccount = useCallback(
    (account: Omit<Account, "id">) => {
      const id = `${Date.now()}`;

      setAccounts((current) => {
        const next = new Map(current);

        next.set(id, {
          ...account,
        });

        return next;
      });

      return id;
    },
    [setAccounts]
  );

  return {
    addAccount,
  };
};
