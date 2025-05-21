import type { Address } from "viem";

export type Account = {
  id: string;
  name?: string;
  symbol?: string;
  ethereum?: EthereumWallet["address"];
  solana?: SolanaWallet["address"];
  bitcoin?: BitcoinWallet["address"];
};

export type Wallet = EthereumWallet | SolanaWallet | BitcoinWallet;

type Network =
  | EthereumWallet["network"]
  | SolanaWallet["network"]
  | BitcoinWallet["network"];

type WalletAddress =
  | EthereumWallet["address"]
  | SolanaWallet["address"]
  | BitcoinWallet["address"];

type WalletBase<
  Network extends Network = Network,
  WalletAddress extends WalletAddress = WalletAddress
> = {
  name?: string;
  address: WalletAddress;
  network: Network;
  account: Account["id"];
};

export type EthereumWallet = WalletBase<"ethereum", Address>;

export type SolanaWallet = WalletBase<"solana", string>;

export type BitcoinWallet = WalletBase<
  "bitcoin",
  | `1${string}` // Legacy (P2PKH)
  | `3${string}` // Script (P2SH)
  | `bc1${string}` // Bech32 (SegWit)
>;
