"use client";
import { useWallet } from "./useWallet";

export const WalletConnect = () => {
  const {
    connect,
    isConnecting,
    isConnected,
    address,
    balance,
    network,
    error,
  } = useWallet();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Mycelia</h1>
      <p className="mt-4 text-lg">Tap into the network</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={connect}
        disabled={isConnecting || isConnected}
      >
        {isConnecting ? "Connecting..." : isConnected ? "Connected" : "Connect"}
      </button>
      {isConnected && (
        <div className="mt-6">
          <p>Address: {address}</p>
          <p>Balance: {balance} ETH</p>
          <p>Network: {network}</p>
        </div>
      )}
      {error && <p className="mt-6 text-red-500">{error}</p>}
    </main>
  );
};
