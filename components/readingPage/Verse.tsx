import { VerseProps } from "@/types/VerseTypes";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default async function Verse({ verse }: { verse: VerseProps }) {
  const tafsirFetch = await fetch(
    `https://api.quran.com/api/v4/tafsirs/16/by_ayah/${verse.key}?language=ar`,
  );
  const { tafsir } = await tafsirFetch.json();
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="hover:bg-orange dark:hover:bg-dark-orange rounded-md transition"
      >
        <p className="inline px-1 [word-spacing:_-3px] sm:[word-spacing:_-4px]">
          {verse.text}
          {` \u06DD${verse.numberInSurah}`}
        </p>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="text-center text-xl font-semibold dark:text-white">
            {tafsir.translated_name.name}
          </h2>
          <span>آية {verse.numberInSurah}</span>
        </div>

        <div
          className="*:text-dark-orange dark:*:text-orange scrollbar max-h-96 overflow-auto rounded-md bg-white p-3 text-lg *:font-bold dark:bg-inherit dark:text-white"
          dangerouslySetInnerHTML={{ __html: tafsir.text }}
        />
      </DialogContent>
    </Dialog>
  );
}
