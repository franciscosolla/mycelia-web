import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <Link href="/">
    <h1 className="text-xl font-bold text-stone-50 flex flex-row items-center gap-2">
      <Image src="/logo-dark.webp" alt="Mycelia" width={24} height={24} />
      MYCELIA
    </h1>
  </Link>
);
