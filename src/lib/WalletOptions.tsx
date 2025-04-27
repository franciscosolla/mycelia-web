import { useEffect, useState } from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return (
    <ul className="flex flex-col gap-2 items-end mb-50">
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </ul>
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <li>
      <button
        disabled={!ready}
        onClick={onClick}
        className="p-1.5 pl-3 pr-8 bg-white text-gray-950 rounded-l-sm hover:pr-10 focus:pr-10 transition-all active:opacity-80"
      >
        {connector.name}
      </button>
    </li>
  );
}
