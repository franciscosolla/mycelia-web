import { isAddress } from "viem";

export const isValidEthereumAddress = (address: string) => {
  return isAddress(address);
};
