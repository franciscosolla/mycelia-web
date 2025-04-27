export type Wallet = {
  address: string;
  network: Network;
  getBalance: () => Promise<string>;
  onBlock: (listener: Listener) => () => void;
};
