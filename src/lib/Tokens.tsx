"use client";
import Image from "next/image";
import { formatUnits, type Address } from "viem";
import { useTokenBalances } from "./useTokenBalances";
import { useTokenMetadata } from "./useTokenMetadata";

export const Tokens = () => {
  const { tokens, totalUsd } = useTokenBalances();

  return (
    <>
      <h2 className="text-2xl font-bold px-2 text-stone-50">
        {`$${totalUsd}`.slice(0, 10)}
      </h2>
      <section className="flex flex-row gap-2 overflow-x-scroll no-scrollbar">
        {tokens?.map(({ tokenAddress, balance, coin }) => (
          <Token
            key={tokenAddress as string}
            tokenAddress={tokenAddress}
            balance={balance}
            usdPrice={coin?.price}
          />
        ))}
      </section>
    </>
  );
};

const Token = ({
  tokenAddress,
  balance,
  usdPrice,
}: {
  tokenAddress: Address;
  balance: string | number | bigint | undefined;
  usdPrice: number | undefined;
}) => {
  const { data: { decimals, logo, name, symbol } = {} } =
    useTokenMetadata(tokenAddress);

  if (usdPrice === undefined) {
    return null;
  }

  const weightedBalance = !decimals
    ? Number(balance)
    : Number(balance) / 10 ** decimals;

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
      <h4 className="text-left text-xs font-medium whitespace-nowrap w-fit min-w-32">{`${formatUnits(
        (balance as bigint) ?? 0,
        decimals ?? 0
      ).slice(0, 10)}`}</h4>
      <h3 className="text-left text-xl font-bold whitespace-nowrap w-fit min-w-32">
        {`$${usdPrice * weightedBalance}`.slice(0, 10)}
      </h3>
    </div>
  );
};
