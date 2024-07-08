import { removeTashkeel } from "@/lib/utils";

export default function SurahTitle({ surahName }: { surahName: string }) {
  return (
    <div className="relative flex items-center justify-center py-10">
      <h2 className="relative flex h-12 w-36 items-center justify-center rounded-lg bg-white font-camel text-xl font-extrabold text-black ring-4 ring-white before:absolute before:left-[calc(100%+4px)] before:h-4/5 before:w-5 before:rounded-r-lg before:border-y-4 before:border-r-4 before:border-white after:absolute after:right-[calc(100%+4px)] after:h-4/5 after:w-5 after:rounded-l-lg after:border-y-4 after:border-l-4 after:border-white sm:h-14 sm:w-40 sm:text-2xl md:h-20 md:w-56 md:text-3xl before:md:w-8 after:md:w-8">
        {removeTashkeel(surahName)}
      </h2>
    </div>
  );
}
