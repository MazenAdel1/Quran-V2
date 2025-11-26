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
      prefetch={true}
      className={cn(
        buttonVariants({
          variant: "navy",
          className: `fixed ${`${direction}-0`} top-1/2 -translate-y-1/2 ${direction == "left" ? `rounded-l-none rounded-r-full` : "rounded-l-full rounded-r-none"} h-1/2 px-0.5 opacity-40 transition-opacity hover:opacity-100`,
        }),
      )}
    >
      <Image
        src={arrow}
        alt="arrow"
        className={`w-7 sm:w-9 ${direction === "left" ? "rotate-180" : ""} invert-[1] dark:invert-0`}
      />
    </Link>
  );
}
