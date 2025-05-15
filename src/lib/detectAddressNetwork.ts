import { isValidBitcoinAddress } from "./isValidBitcoinAddress";
import { isValidEthereumAddress } from "./isValidEthereumAddress";
import { isValidSolanaAddress } from "./isValidSolanaAddress";

export const detectAddressNetwork = (address: string) => {
  if (isValidEthereumAddress(address)) {
    return "ethereum";
  }

  if (isValidSolanaAddress(address)) {
    return "solana";
  }

  if (isValidBitcoinAddress(address)) {
    return "bitcoin";
  }

  return undefined;
};
