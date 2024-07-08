import Link from "next/link";
import DeleteBookmark from "./DeleteBookmark";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";

export default function Bookmark({
  page,
  onClick,
}: {
  page: number;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        buttonVariants({
          variant: "navy",
          padding: "md",
          className: "list-button",
        }),
      )}
    >
      <Link
        key={page}
        href={`/page/${page}`}
        className="flex-1"
        onClick={() => onClick && onClick()}
      >
        صفحة {page}
      </Link>
      <DeleteBookmark page={page} />
    </div>
  );
}
