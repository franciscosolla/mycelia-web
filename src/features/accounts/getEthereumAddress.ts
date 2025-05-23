import { GlobalState } from "@/lib/GlobalState";

export const getEthereumAddress = (index: number | string) =>
  GlobalState.get(`account.[${index}].ethereum`);
