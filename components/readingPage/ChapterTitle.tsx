import { removeTashkeel } from "@/lib/utils";

export default function ChapterTitle({
  chapterTitle,
}: {
  chapterTitle: string;
}) {
  return (
    <div className="relative flex items-center justify-center py-2">
      <h2 className="relative flex h-10 w-28 items-center justify-center rounded-lg bg-black font-camel text-lg font-extrabold text-white ring-4 ring-black before:absolute before:left-[calc(100%+4px)] before:h-4/5 before:w-3 before:rounded-r-lg before:border-y-4 before:border-r-4 before:border-black after:absolute after:right-[calc(100%+4px)] after:h-4/5 after:w-3 after:rounded-l-lg after:border-y-4 after:border-l-4 after:border-black dark:bg-white dark:text-black dark:ring-white before:dark:border-white after:dark:border-white sm:h-10 sm:w-36 sm:text-xl md:h-12 md:w-40 md:text-2xl before:md:w-5 after:md:w-5">
        {removeTashkeel(chapterTitle)}
      </h2>
    </div>
  );
}
