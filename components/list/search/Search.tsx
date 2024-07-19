"use client";

import { Button } from "../../ui/button";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef } from "react";
import { SearchIcon } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

export default function Search() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams().get("search");
  const inputRef = useRef<HTMLInputElement>(null);

  const filters = useAppSelector((state) => state.filter.value);
  const currentFilter = filters.filter(({ active }) => active)[0].id;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current?.value.trim()) {
      router.push(`?search=${inputRef.current?.value.trim()}`, {
        scroll: false,
      });
    } else {
      const isParams = Object.keys(params)[0] && Object.values(params)[0];
      if (isParams) {
        router.replace(
          `/${Object.keys(params)[0]}/${Object.values(params)[0]}`,
        );
      } else {
        router.replace("/");
      }
    }
  };

  return (
    currentFilter == "surahs" && (
      <form
        className="flex h-fit w-full items-center gap-2"
        onSubmit={handleSubmit}
      >
        <Button
          type="submit"
          variant="navy"
          rounded="pill"
          className="peer flex shrink-0 items-center justify-center p-2"
        >
          <SearchIcon className="block size-full" />
        </Button>
        <input
          type="search"
          placeholder="البحث..."
          ref={inputRef}
          defaultValue={searchParams!}
          className="bg-light-dark-orange w-full rounded-full px-4 py-2 text-black outline-none ring-1 ring-[#ffae67] placeholder:text-black placeholder:opacity-50 dark:bg-light-navy dark:text-primary-white dark:ring-navy placeholder:dark:text-white"
        />
      </form>
    )
  );
}
