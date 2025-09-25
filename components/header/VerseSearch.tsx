"use client";

import { Loader, Search } from "lucide-react";
import { Button } from "../ui/button";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogClose, DialogContent, DialogTrigger } from "../ui/dialog";
import Link from "next/link";

export default function VerseSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  type SearchResult = {
    total_results: number;
    results: any[];
    next_results: SearchResult;
  };

  const [data, setData] = useState<SearchResult | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(
    async (query: string) => {
      setIsLoading(true);

      const searchResults = (
        await fetch(
          `https://api.qurani.ai/gw/qh/v1/search/${query}?language=ar&editionIdentifier=quran-simple&surahNumber=1&exactSearch=true&limit=10&offset=${(page - 1) * 10}`,
        ).then((res) => res.json())
      ).data;

      const nextSearchResults = (
        await fetch(
          `https://api.qurani.ai/gw/qh/v1/search/${query}?language=ar&editionIdentifier=quran-simple&surahNumber=1&exactSearch=true&limit=10&offset=${page * 10}`,
        ).then((res) => res.json())
      ).data;

      setData({
        total_results: searchResults?.count,
        results: searchResults?.ayahs,
        next_results: {
          total_results: nextSearchResults?.count,
          results: nextSearchResults?.ayahs,
          next_results: {} as SearchResult,
        },
      });

      setIsLoading(false);
    },
    [page],
  );

  const submitForm: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const query = inputRef.current?.value;
    if (query) {
      triggerRef.current?.click();
      setPage(1);
      await search(query);
    }
  };

  useEffect(() => {
    (async () => await search(inputRef.current?.value || ""))();
  }, [page, search]);

  return (
    <>
      <form
        className="flex h-fit items-center"
        onSubmit={submitForm}
        ref={formRef}
      >
        <input
          type="search"
          placeholder="البحث عن آية..."
          className="border-orange focus:outline-dark-orange rounded-r-md border px-2 py-1 backdrop-blur-md focus:outline dark:text-white"
          ref={inputRef}
        />
        <Button className="h-[34px] rounded-r-none" variant={"orange"}>
          <Search size={16} />
        </Button>
      </form>
      <Dialog>
        <DialogTrigger className="sr-only" ref={triggerRef} />
        <DialogContent className="pt-10">
          {isLoading ? (
            <div className="flex justify-center">
              <Loader className="animate-spin text-center dark:text-white" />
            </div>
          ) : data ? (
            <>
              <DialogClose className="sr-only" ref={closeRef} />
              <span className="text-center dark:text-white">
                عدد النتائج الحالية: {data?.total_results}
              </span>
              {data?.results?.map((verse, verseIndex) => {
                return (
                  <Link
                    href={`/page/${verse.page}?highlight=${verse.number}`}
                    className="font-amiri group text-lg leading-9 dark:text-white"
                    key={verse.number}
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
              <div className="flex w-full justify-between gap-2 *:flex-1">
                <Button
                  onClick={() => setPage((prev) => prev - 1)}
                  disabled={page === 1}
                >
                  السابق
                </Button>
                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={data.next_results?.total_results === 0}
                >
                  التالي
                </Button>
              </div>
            </>
          ) : (
            <h1>هناك خطأ ما</h1>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
