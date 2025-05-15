"use client";

import { detectAddressNetwork } from "@/lib/detectAddressNetwork";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import type { Address } from "viem";

type Account = {
  ethereum?: Address;
  solana?: string;
  bitcoin?: string;
};

const AccountContext = createContext<{
  accounts: Account[];
  setAccounts: Dispatch<SetStateAction<Account[]>>;
}>({
  accounts: [],
  setAccounts: () => {},
});

const getAccountsFromLocalStorage = (): Account[] => {
  const raw = window?.localStorage.getItem("accounts");

  if (raw) {
    return JSON.parse(raw);
  }

  return [];
};

const persistAccounts = (accounts: Account[]) => {
  window?.localStorage.setItem("accounts", JSON.stringify(accounts));
};

export const AccountProvider = ({ children }: PropsWithChildren) => {
  const [accounts, setAccounts] = useState<Account[]>(
    getAccountsFromLocalStorage
  );

  useEffect(() => {
    persistAccounts(accounts);
  }, [accounts]);

  const value = useMemo(
    () => ({
      accounts,
      setAccounts,
    }),
    [accounts]
  );

  return (
    <AccountContext.Provider value={value}>{children}\</AccountContext.Provider>
  );
};

export const useAccount = (index: number = 0) => {
  const { accounts, setAccounts } = useContext(AccountContext);

  const account = accounts[index];

  const setAccount = useCallback(
    (account: Account) => {
      setAccounts((current) => {
        const next = [...current];
        next[index] = account;
        return next;
      });
    },
    [index, setAccounts]
  );

  const setAddress = useCallback(
    (address: string) => {
      const network = detectAddressNetwork(address);

      if (network) {
        return setAccount({
          ...account,
          [network]: address,
        });
      }

      throw new Error("Network not detected");
    },
    [account, setAccount]
  );

  return {
    account,
    setAccount,
    setAddress,
  };
};

export const useAddAccount = () => {
  const { setAccounts } = useContext(AccountContext);

  const addAccount = useCallback(
    (account: Account) => setAccounts((current) => [...current, account]),
    [setAccounts]
  );

  return {
    addAccount,
  };
};
