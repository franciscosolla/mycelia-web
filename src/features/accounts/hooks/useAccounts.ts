"use client";
import { useGlobalState } from "@/hooks/useGlobalState";

export const useAccounts = () => useGlobalState("account");
