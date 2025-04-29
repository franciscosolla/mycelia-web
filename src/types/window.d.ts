interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    isCoinbaseWallet?: boolean;
    on?: (event: string, handler: (params: unknown) => void) => void;
    removeListener?: (
      event: string,
      handler: (params: unknown) => void
    ) => void;
    providers?: Array<{
      isMetaMask?: boolean;
      isCoinbaseWallet?: boolean;
    }>;
  };
  phantom?: {
    solana?: {
      isPhantom?: boolean;
    };
    ethereum?: {
      isPhantom?: boolean;
    };
  };
}
