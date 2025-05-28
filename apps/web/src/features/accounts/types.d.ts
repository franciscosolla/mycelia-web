import type {
  BitcoinWallet,
  EthereumWallet,
  SolanaWallet,
} from "../wallet/types";

export type Account = {
  name?: string;
  ethereum: EthereumWallet["address"];
  solana: SolanaWallet["address"];
  bitcoin: BitcoinWallet["address"];
};
