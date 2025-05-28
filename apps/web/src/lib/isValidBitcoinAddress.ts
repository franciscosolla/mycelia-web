import { address as btcAddress } from "bitcoinjs-lib";

export const isValidBitcoinAddress = (address: string) => {
  try {
    btcAddress.toOutputScript(address);
    return true;
  } catch {
    return false;
  }
};
