/**
 * Merges multiple React Query states into a single composite state.
 * Useful for dependent or grouped queries where combined status is needed.
 */
export const mergeQueryStates = (
  ...queries: {
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    isSuccess: boolean;
    isPending: boolean;
    status: "error" | "pending" | "success" | string;
    error?: unknown;
    data?: unknown;
    refetch?: () => void;
  }[]
) => {
  return {
    isLoading: queries.some((q) => q.isLoading),
    isFetching: queries.some((q) => q.isFetching),
    isError: queries.some((q) => q.isError),
    isSuccess: queries.every((q) => q.isSuccess),
    isPending: queries.some((q) => q.isPending),
    status: queries.some((q) => q.status === "error")
      ? "error"
      : queries.some((q) => q.status === "pending")
      ? "pending"
      : "success",
    error: queries.find((q) => q.error)?.error,
    refetch: async () => {
      for (const q of queries) {
        if (q.refetch) {
          await q.refetch();
        }
      }
    },
  };
};
