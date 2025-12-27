import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ArrowBigRight } from "lucide-react";

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
      <ArrowBigRight
        className={cn(
          `size-5 sm:size-7`,
          direction === "left" ? "rotate-180" : "",
        )}
      />
    </Link>
  );
}
