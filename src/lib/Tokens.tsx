"use client";
import Image from "next/image";
import { formatUnits, type Address } from "viem";
import { useTokenBalances } from "./useTokenBalances";
import { useTokenMetadata } from "./useTokenMetadata";

export const Tokens = () => {
  const tokens = useTokenBalances();

  return (
    <section className="flex flex-row gap-2 overflow-x-scroll no-scrollbar">
      {tokens?.map(({ tokenAddress, balance }) => (
        <Token
          key={tokenAddress as string}
          tokenAddress={tokenAddress}
          balance={balance}
        />
      ))}
    </section>
  );
};

const Token = ({
  tokenAddress,
  balance,
}: {
  tokenAddress: Address;
  balance: string | number | bigint | undefined;
}) => {
  const { data } = useTokenMetadata(tokenAddress);

  return (
    <div className="relative flex flex-col justify-end p-3 min-h-32 bg-stone-800 text-stone-50 rounded-2xl">
      <div className="absolute top-3 left-3 flex flex-row gap-2 items-center">
        {data?.logo ? (
          <Image
            src={data.logo}
            alt={`${data.name} logo`}
            className="w-11 h-11 rounded-lg"
            width={48}
            height={48}
          />
        ) : (
          <div className="h-11" />
        )}
        <span className="font-bold">{data?.symbol}</span>
      </div>
      <h4 className="text-left text-md font-medium whitespace-nowrap w-fit min-w-32">{`${formatUnits(
        (balance as bigint) ?? 0,
        data?.decimals ?? 0
      )}`}</h4>
    </div>
  );
};
