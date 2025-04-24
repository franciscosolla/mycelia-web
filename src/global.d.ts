import { Ethereum } from "@web3-react/types";

declare global {
  interface Window {
    ethereum: Ethereum;
  }
}
