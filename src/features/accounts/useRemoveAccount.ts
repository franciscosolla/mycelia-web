import { useCallback } from "react";
import { useAccounts } from "./useAccounts";

export const useRemoveAccount = () => {
  const { setAccounts } = useAccounts();

  const removeAccount = useCallback(
    (id: number = 0) => {
      setAccounts((current) => {
        const next = [...current];
        next.splice(id, 1);
        return next;
      });
    },
    [setAccounts]
  );

  return {
    removeAccount,
  };
};
