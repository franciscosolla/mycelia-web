import UniversalProvider from "@walletconnect/universal-provider";
import { BrowserProvider, type JsonRpcSigner, type Listener } from "ethers";
import type { Wallet } from "./types";

//  Initialize the provider
const provider = await UniversalProvider.init({
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID,
  metadata: {
    name: "Mycelia",
    description: "The multichanin network",
    url: "https://mycelia.solla.dev/",
    icons: ["https://mycelia.solla.dev/favicon.ico"],
  },
  client: undefined, // optional instance of @walletconnect/sign-client
});

//  create sub providers for each namespace/chain
export const connectWalletUniversalProvider = async (): Promise<Wallet> => {
  await provider.connect({
    optionalNamespaces: {
      eip155: {
        methods: [
          "eth_sendTransaction",
          "eth_signTransaction",
          "eth_sign",
          "personal_sign",
          "eth_signTypedData",
        ],
        chains: ["eip155:80001"],
        events: ["chainChanged", "accountsChanged"],
        rpcMap: {
          80001: `https://rpc.walletconnect.com?chainId=eip155:80001&projectId=${process.env.NEXT_PUBLIC_REOWN_PROJECT_ID}`,
        },
      },
    },
    pairingTopic: "<123...topic>", // optional topic to connect to
    skipPairing: false, // optional to skip pairing ( later it can be resumed by invoking .pair())
  });

  const ethersProvider = new BrowserProvider(provider);

  let signer: JsonRpcSigner;

  const [address, network] = await Promise.all([
    ethersProvider.getSigner().then((s) => {
      signer = s;
      return signer.getAddress();
    }),
    ethersProvider.getNetwork(),
  ]);

  console.log("Connected Address:", address);

  return {
    address,
    network,
    getBalance() {
      return ethersProvider
        .getBalance(address)
        .then((balance) => (Number(balance) / 1e18).toFixed(4));
    },
    onBlock(listener: Listener) {
      provider.on("block", listener);
      return () => provider.off("block", listener);
    },
  };
};
