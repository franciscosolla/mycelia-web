import type { Balance } from "../hooks/useBalance";

export const toPrice = ({ balance, price, decimals }: Balance) =>
  (Number(balance) / 10 ** decimals) * price;
