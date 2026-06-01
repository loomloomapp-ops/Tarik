import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { company } from "@/content/company";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  // Over the dark hero: white lettering + colored icon. On the solid light
  // header: the original full-colour logo.
  const src = tone === "light" ? "/logo-ondark.png" : "/logo.png";
  return (
    <Link href="/" aria-label={company.name} className="inline-flex items-center">
      <Image
        src={src}
        alt={company.name}
        width={584}
        height={824}
        priority
        className="h-[4.5rem] w-auto lg:h-28"
      />
    </Link>
  );
}
