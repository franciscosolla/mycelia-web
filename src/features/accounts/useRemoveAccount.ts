import { useCallback } from "react";
import { useAccounts } from "./useAccounts";

export const useRemoveAccount = () => {
  const { setAccounts } = useAccounts();

  const removeAccount = useCallback(
    (id: string) => {
      setAccounts((current) => {
        const next = new Map(current);

        next.delete(`${id}`);

        return next;
      });
    },
    [setAccounts]
  );

  return {
    removeAccount,
  };
};
