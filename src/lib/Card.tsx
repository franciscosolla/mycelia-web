import Image from "next/image";
import type { PropsWithChildren } from "react";

export const Card = ({ children }: PropsWithChildren) => (
  <div className="relative flex flex-col justify-end p-2 min-h-24 bg-stone-800 text-stone-50 rounded-2xl">
    {children}
  </div>
);

export const CardLogo = ({
  src,
  alt,
  size,
}: {
  src: string;
  alt?: string;
  size: 24;
}) => (
  <Image
    src={src}
    alt={alt ?? "Logo"}
    className={`w-${size} h-${size} rounded-lg absolute top-2 left-2`}
    width={size}
    height={size}
  />
);

export const CardContent = ({ children }: PropsWithChildren) => (
  <h3 className="text-left text-md font-medium whitespace-nowrap w-fit">
    {children}
  </h3>
);
