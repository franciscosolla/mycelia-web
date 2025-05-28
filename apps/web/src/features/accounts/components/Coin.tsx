import { useTokenMetadata } from "@/hooks/useTokenMetadata";
import Image from "next/image";
import type { Address } from "viem";

export const Coin = ({
  address,
  usd,
  value,
}: {
  address: string;
  usd: number;
  value: number;
}) => {
  const { data: { logo, name, symbol } = {} } = useTokenMetadata(
    address as Address
  );

  return (
    <div className="relative flex flex-col justify-end p-3 min-h-34 bg-stone-800 text-stone-50 rounded-2xl gap-1">
      <div className="absolute top-3 left-3 flex flex-row gap-2 items-center">
        {logo ? (
          <Image
            src={logo}
            alt={`${name} logo`}
            className="w-11 h-11 rounded-lg"
            width={48}
            height={48}
          />
        ) : (
          <div className="h-11" />
        )}
        <span className="font-bold">{symbol}</span>
      </div>
      <h5 className="text-left text-xs font-medium whitespace-nowrap w-fit min-w-32">{`${value.toFixed(
        8
      )}`}</h5>
      <h4 className="text-left text-xl font-bold whitespace-nowrap w-fit min-w-32">
        {`$${usd.toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
      </h4>
    </div>
  );
};
