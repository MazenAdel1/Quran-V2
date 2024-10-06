"use client";

import { ListProps } from "@/types/ListTypes";
import Filter from "./filter/Filter";
import SectionNavigation from "./SectionNavigation";
import Search from "./search/Search";
import ChapterButton from "@/components/list/ChapterButton";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/redux/hooks";
import Bookmark from "./bookmark/Bookmark";
import { useSearchParams } from "next/navigation";
import chapters from "@/data/chapters.json";
import juzs from "@/data/juzs.json";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { useMemo, useRef } from "react";

export default function List({
  container = true,
  filterAndSearchLayout = "row",
  chapterButtonProps,
  sheet = false,
  sheetTriggerIcon,
}: ListProps) {
  const filters = useAppSelector((state) => state.filter.value);
  const currentFilter = filters.filter(({ active }) => active)[0].id;

  const bookmarks = useAppSelector((state) => state.bookmarks.value);
  const searchParams = useSearchParams();

  const sheetCloseRef = useRef<HTMLButtonElement>(null);

  const Data = useMemo(() => {
    switch (currentFilter) {
      case "chapters":
        if (searchParams.get("search"))
          return chapters.map((chapter) => {
            if (chapter.title.includes(searchParams.get("search") as string)) {
              {
                return (
                  <ChapterButton
                    key={chapter.id}
                    {...chapter}
                    {...chapterButtonProps}
                    onClick={() => sheetCloseRef.current?.click()}
                  />
                );
              }
            }
          });
        return chapters.map((chapter) => (
          <ChapterButton
            key={chapter.id}
            {...chapter}
            {...chapterButtonProps}
            onClick={() => sheetCloseRef.current?.click()}
          />
        ));
      case "juzs":
        return juzs.map((juz) => (
          <Link
            key={juz.id}
            href={`/page/${juz.page}`}
            className={cn(
              buttonVariants({
                variant: "navy",
                padding: "md",
                className: "list-button",
              }),
            )}
            onClick={() => sheetCloseRef.current?.click()}
          >
            {juz.title}
          </Link>
        ));
      case "bookmarks":
        return bookmarks.length ? (
          bookmarks
            .map((bookmark) => (
              <Bookmark
                key={bookmark.page}
                page={bookmark.page}
                onClick={() => sheetCloseRef.current?.click()}
              />
            ))
            .reverse()
        ) : (
          <h2
            className={`absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center ${sheet ? "text-2xl" : "text-2xl sm:text-3xl"} text-black dark:text-white`}
          >
            ليس لديك مرجعيات
          </h2>
        );
    }
  }, [bookmarks, currentFilter, searchParams, sheet, chapterButtonProps]);

  return sheet ? (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center">
        {sheetTriggerIcon}
      </SheetTrigger>
      <SheetContent
        className={`flex h-full flex-col gap-3 bg-light-orange pt-14 scrollbar scrollbar-track-light-white scrollbar-thumb-black dark:bg-navy dark:scrollbar-track-light-navy dark:scrollbar-thumb-white`}
        side={"left"}
      >
        <SheetClose ref={sheetCloseRef} className="hidden"></SheetClose>
        <div
          className={`flex w-full flex-col-reverse items-center justify-between gap-3`}
        >
          <Search />
          <Filter fullWidth={filterAndSearchLayout === "col"} />
        </div>
        <div className="relative flex h-max flex-col gap-3 lg:block">
          <div
            className={`grid min-h-20 flex-1 grid-cols-1 place-content-start gap-3 rounded-t-lg scrollbar-thin`}
          >
            {Data}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <section
      className={`${container ? "container lg:w-[70%] xl:w-[60%]" : ""} flex h-full flex-col gap-3`}
    >
      <div
        className={`flex flex-col items-center gap-3 sm:h-10 sm:flex-row ${currentFilter == "chapters" ? "justify-between" : "justify-end pt-[52px] sm:pt-0"}`}
      >
        <Search />

        <Filter fullWidth={false} />
      </div>
      <div className="relative flex h-max flex-col gap-3 lg:block">
        <SectionNavigation />
        <div
          className={`relative grid min-h-20 flex-1 grid-cols-1 place-content-start gap-2 rounded-t-lg bg-light-orange p-2 scrollbar-thin dark:bg-navy sm:grid-cols-2 sm:gap-5 sm:p-5 md:grid-cols-3`}
        >
          {Data}
        </div>
      </div>
    </section>
  );
}
