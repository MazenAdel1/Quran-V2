"use client";

import { Loader2, Search } from "lucide-react";
import { Button } from "../ui/button";
import { FormEventHandler, useRef, useState, useTransition } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogClose, DialogContent, DialogTrigger } from "../ui/dialog";
import Link from "next/link";
import { VerseProps } from "@/types/VerseTypes";
import { getVersePageInfoFromId, verseSearch } from "@/lib/utils";

const CHUNK_SIZE = 50;

export default function VerseSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<VerseProps[] | undefined>(undefined);
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const [isPending, startTransition] = useTransition();

  const search = async (query: string) => {
    const results = await verseSearch(query);
    startTransition(() => {
      setData(results);
      setVisibleCount(CHUNK_SIZE);
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || !data) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollHeight - scrollTop - clientHeight < 100) {
      setVisibleCount((prev) => Math.min(prev + CHUNK_SIZE, data.length));
    }
  };

  const submitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const query = inputRef.current?.value;
    if (query) {
      setData(undefined);
      triggerRef.current?.click();
      await search(query);
    }
  };

  return (
    <>
      <form
        className="flex h-fit w-full max-w-xs items-center sm:w-sm"
        onSubmit={submitForm}
        ref={formRef}
      >
        <input
          type="search"
          placeholder="البحث عن آية..."
          className="border-orange focus:outline-dark-orange h-[34px] w-full min-w-0 flex-1 rounded-r-md border-2 px-2 py-1 backdrop-blur-md focus:h-[32px] focus:outline dark:text-white"
          ref={inputRef}
        />
        <Button className="h-[34px] shrink-0 rounded-r-none" variant={"orange"}>
          <Search size={16} />
        </Button>
      </form>
      <Dialog>
        <DialogTrigger className="sr-only" ref={triggerRef} />
        <DialogContent
          className="max-h-[90dvh] pt-10"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          <DialogClose className="sr-only" ref={closeRef} />
          {isPending || !data ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin text-center dark:text-white" />
            </div>
          ) : (
            <>
              <span className="text-center dark:text-white">
                عدد النتائج الحالية: {data.length}
              </span>
              <div className="flex flex-col gap-2 overflow-y-auto">
                {data.slice(0, visibleCount).map((verse, verseIndex) => {
                  return (
                    <Link
                      href={`/page/${getVersePageInfoFromId(verse.id).pageNumber}?highlight=${verse.id}`}
                      className="font-amiri group text-lg leading-9 dark:text-white"
                      key={verse.id}
                      onClick={() => {
                        closeRef.current?.click();
                        formRef.current?.reset();
                      }}
                    >
                      {verseIndex + 1} - {<span>{verse.text}</span>}{" "}
                      {`\u06DD${verse.numberInSurah}`}{" "}
                      <span className="text-sm">[{verse.surah.name}]</span>
                    </Link>
                  );
                })}
                {visibleCount < data.length && (
                  <div className="flex justify-center py-2">
                    <Loader2
                      className="animate-spin dark:text-white"
                      size={20}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
