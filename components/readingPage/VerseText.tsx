"use client";

import { cn } from "@/lib/utils";
import { VerseProps } from "@/types/VerseTypes";
import { useSearchParams } from "next/navigation";
import { DialogTrigger } from "../ui/dialog";

export default function VerseText({ verse }: { verse: VerseProps }) {
  const verseId = +useSearchParams().get("highlight")!;

  return (
    <DialogTrigger
      asChild
      className="hover:bg-orange dark:hover:bg-dark-orange rounded-md transition"
    >
      <p
        className={cn(
          `inline px-1 [word-spacing:_-3px] sm:[word-spacing:_-4px]`,
          verseId == verse.id ? "bg-orange dark:bg-dark-orange rounded-md" : "",
        )}
      >
        {verse.text}
        {` \u06DD${verse.numberInSurah}`}
      </p>
    </DialogTrigger>
  );
}
