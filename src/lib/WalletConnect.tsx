"use client";
import { Button } from "./Button";
import { useWallet } from "./WalletContext";

export const WalletConnect = () => {
  const { wallet, connectWallet, isConnecting } = useWallet();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Mycelia</h1>
      <p className="text-lg">Tap into the network</p>
      <Button
        onClick={connectWallet}
        disabled={Boolean(isConnecting || wallet)}
      >
        {isConnecting ? "Connecting..." : wallet ? "Connected" : "Connect"}
      </Button>
      {wallet && (
        <div className="mt-6">
          <p>Address: {wallet.address}</p>
          <p>Balance: {wallet.getBalance()} ETH</p>
          <p>Network: {wallet.network.name}</p>
        </div>
      )}
    </div>
  );
};
