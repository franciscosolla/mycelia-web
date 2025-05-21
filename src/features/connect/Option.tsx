"use client";

import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import Image from "next/image";
import { type PropsWithChildren } from "react";

export const Option = ({
  icon,
  title,
  onClick,
  children,
}: PropsWithChildren<{
  icon: `/${string}` | IconName;
  title: string;
  onClick: () => void;
}>) => (
  <button
    onClick={onClick}
    className="relative flex flex-col justify-end p-2 w-32 h-32 bg-stone-800 text-stone-50 rounded-2xl border-2 border-stone-800 hover:border-stone-600 transition-all duration-400 active:opacity-80"
  >
    {icon.includes("/") ? (
      <Image
        src={icon}
        alt={`${title} icon`}
        className="w-12 h-12 rounded-lg absolute top-2 left-2"
        width={48}
        height={48}
      />
    ) : (
      <DynamicIcon
        name={icon as IconName}
        className="absolute top-2 left-2"
        size={48}
      />
    )}

    {children ? (
      <p className="text-xs text-stone-400 text-left">{children}</p>
    ) : null}

    <h3 className="text-left text-md font-medium">{title}</h3>
  </button>
);
