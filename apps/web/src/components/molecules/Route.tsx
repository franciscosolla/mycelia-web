import clsx from "clsx";
import type { IconName } from "lucide-react/dynamic";
import Link from "next/link";
import { Icon } from "../atoms/Icon";

interface Props {
  icon: IconName;
  label: string;
  href: string;
  round?: true;
  description?: string;
}

interface RectProps extends Props {
  description: string;
}

interface RoundProps extends Props {
  round: true;
}

export const Route = ({
  icon,
  label,
  href,
  round,
  description,
}: RectProps | RoundProps) => (
  <Link
    href={href}
    className={clsx(
      "bg-mycelia-100 items-center",
      round
        ? "flex flex-col justify-center rounded-full py-3 px-5 aspect-square"
        : "grid grid-cols-[min-content_1fr] grid-rows-2 rounded-sm px-2 py-4 gap-y-2 gap-x-4"
    )}
  >
    <Icon
      name={icon}
      size={round ? "md" : "lg"}
      className="row-span-2 col-span-1"
    />
    {round ? <h6>{label}</h6> : <h3>{label}</h3>}
    {round ? null : <h5>{description}</h5>}
  </Link>
);
