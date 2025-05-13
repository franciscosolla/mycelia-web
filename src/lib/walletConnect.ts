import UniversalProvider from "@walletconnect/universal-provider";

export const provider = await UniversalProvider.init({
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID,
  metadata: {
    name: "Mycelia",
    description: "Tap into the network",
    url: "https://mycelia.solla.dev",
    icons: ["https://mycelia.solla.dev/favicon-dark.png"],
  },
});

export const providerOptions = {
  namespaces: {
    eip155: {
      chains: ["eip155:1"],
      methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
      events: ["accountsChanged", "chainChanged"],
      rpcMap: {
        "eip155:1": "https://rpc.ankr.com/eth",
      },
    },
    // solana: {
    //   chains: ["solana:mainnet"],
    //   methods: ["solana_signTransaction", "solana_signMessage"],
    //   events: [],
    //   rpcMap: {
    //     "solana:mainnet": "https://api.mainnet-beta.solana.com",
    //   },
    // },
  },
};
