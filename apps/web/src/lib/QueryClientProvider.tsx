"use client";
import {
  QueryClientProvider as Provider,
  QueryClient,
} from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <Provider client={queryClient}>{children}</Provider>;
};
