export type Address =
  | `0x${string}`
  | string
  | `1${string}`
  | `3${string}`
  | `bc1${string}`;

export type Wallet<TAddress = Address> = {
  name?: string;
  address: TAddress;
};

export type EthereumWallet = Wallet<`0x${string}`>;

export type SolanaWallet = Wallet<string>;

export type BitcoinWallet = Wallet<
  | `1${string}` // Legacy (P2PKH)
  | `3${string}` // Script (P2SH)
  | `bc1${string}` // Bech32 (SegWit)
>;
