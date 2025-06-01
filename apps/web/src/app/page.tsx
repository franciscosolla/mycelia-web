"use client";
import { useAccountStore } from "@/features/accounts/hooks/useAccountStore";
import clsx from "clsx";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const account = useAccountStore.use.current();

  if (account) {
    return redirect("/account");
  }

  return (
    <main className="flex-1 p-6 flex flex-col items-stretch justify-end pb-20 gap-4">
      <ConnectLink
        icon="eye"
        href="/account/add/watch"
        label="Watch"
        description="Track public wallet addresses"
        className="col-start-2"
      />
      <ConnectLink
        icon="waypoints"
        href="/account/add/connect"
        label="Connect"
        description="Connect through a wallet provider"
        className="row-start-2"
      />
      <ConnectLink
        icon="plus"
        href="/account/add/create"
        label="Create"
        description="Create a new multi-chain account"
        className="row-start-2"
      />
      <ConnectLink
        icon="key-round"
        href="/account/add/import"
        label="Import"
        description="Import an existing account"
        className="row-start-2"
      />
    </main>
  );
}

const ConnectLink = ({
  icon,
  href,
  label,
  description,
  className,
}: {
  icon: IconName;
  href: string;
  label: string;
  description: string;
  className?: string;
}) => (
  <Link
    href={href}
    className={clsx(
      className,
      "bg-mycelia-100 rounded-sm text-mycelia-850 drop-shadow-md flex gap-4 items-center justify-center font-medium px-2 py-4"
    )}
  >
    <DynamicIcon name={icon} size={42} />
    <div className="flex-1">
      <h1 className="text-md font-semibold">{label}</h1>
      <h2 className="text-sm">{description}</h2>
    </div>
  </Link>
);
