import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { SurahProps, buttonProps } from "@/types/SurahTypes";

export default function SurahButton({
  id,
  title,
  revelationPlace,
  versesCount,
  page,
  versesCountExist = true,
  revelationPlaceExist = true,
  idExist = true,
  onClick,
}: SurahProps & buttonProps & { onClick?: () => void }) {
  return (
    <Link
      href={`/page/${page}`}
      className={cn(
        buttonVariants({
          variant: "navy",
          padding: "md",
          className: "list-button",
        }),
      )}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <div>
        <h2>سورة {title}</h2>
        {versesCountExist && (
          <span className="text-base">عدد الآيات: {versesCount}</span>
        )}
      </div>
      {revelationPlaceExist && (
        <span className="text-base">
          {revelationPlace == "makkah" ? "مكية" : "مدنية"}
        </span>
      )}
      {idExist && (
        <span className="absolute -top-1 left-0 flex size-6 items-end rounded-full bg-dark-orange pr-0.5 text-sm font-bold text-primary-white transition hover:bg-orange">
          {id}
        </span>
      )}
    </Link>
  );
}
