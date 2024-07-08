import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import arrow from "@/icons/arrow.svg";

export default function PageNavigate({
  href,
  direction,
}: {
  href: string;
  direction: "right" | "left";
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={cn(
        buttonVariants({
          variant: "navy",
          padding: "md",
          rounded: "md",
          className: `fixed ${`${direction}-0`} top-1/2 -translate-y-1/2 rounded-r-none px-1 opacity-65 transition-opacity hover:opacity-100`,
        }),
      )}
    >
      <Image
        src={arrow}
        alt="arrow"
        className={`w-7 sm:w-9 ${direction === "left" ? "rotate-180" : ""}`}
      />
    </Link>
  );
}
