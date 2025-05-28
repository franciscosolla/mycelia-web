import { isMobile, isMobileAppAccesible, isServer } from "@/lib/devices";

export type Wallet = {
  name: string;
  icon?: string;
  connectorIds: string[];
  desktop: {
    installed: boolean;
  };
  mobile: {
    native?: string; // native deep link
    universal?: string; // universal link as fallback
  };
};

const phantom = {
  name: "Phantom",
  icon: "/phantom-logo.svg",
  connectorIds: ["app.phantom", "injected"],
  desktop: {
    get installed() {
      return (
        !!window?.phantom?.solana?.isPhantom ||
        !!window?.phantom?.ethereum?.isPhantom
      );
    },
  },
  mobile: {
    native: "phantom://",
    universal: "https://phantom.app/ul/browse",
  },
};

const metamask = {
  name: "MetaMask",
  icon: "/metamask-logo.svg",
  connectorIds: ["metaMaskSDK", "injected"],
  desktop: {
    get installed() {
      return !!window?.ethereum?.isMetaMask;
    },
  },
  mobile: {
    native: "metamask://",
    universal: "https://metamask.app.link",
  },
};

const coinbase = {
  name: "Coinbase",
  icon: "/coinbase-logo.svg",
  connectorIds: ["coinbaseWalletSDK"],
  desktop: {
    get installed() {
      return !!window?.ethereum?.isCoinbaseWallet;
    },
  },
  mobile: {
    native: "cbwallet://",
    universal: "https://wallet.coinbase.com",
  },
};

const walletConnect = {
  name: "WalletConnect",
  icon: "/wallet-connect-logo.svg",
  connectorIds: ["walletConnect"],
  desktop: {
    installed: false,
  },
  mobile: {
    universal: "https://walletconnect.com/",
  },
};

const safe = {
  name: "Safe",
  icon: "/safe-logo.svg",
  connectorIds: ["safe"],
  desktop: {
    installed: false,
  },
  mobile: {
    universal: "",
  },
};

export const WALLETS: Wallet[] = [
  walletConnect,
  phantom,
  metamask,
  coinbase,
  safe,
];

export const isWalletInstalled = (wallet: Wallet) => {
  if (isServer()) return false;

  if (wallet.desktop.installed) {
    return true;
  }

  if (isMobile() && wallet.mobile.native) {
    return isMobileAppAccesible(wallet.mobile.native);
  }

  return false;
};
