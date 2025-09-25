"use server";

import { VerseProps } from "@/types/VerseTypes";
import { Dialog, DialogContent } from "../ui/dialog";
import VerseText from "./VerseText";
import { trimVerse } from "@/lib/utils";

export default async function Verse({ verse }: { verse: VerseProps }) {
  const tafsirFetch = await fetch(
    `https://api.quran.com/api/v4/tafsirs/16/by_ayah/${verse.key}?language=ar`,
  );
  const { tafsir } = await tafsirFetch.json();
  return (
    <Dialog>
      <VerseText verse={verse} />
      <DialogContent className="overflow-auto">
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-center text-xl font-bold dark:text-white">
            {tafsir.translated_name.name}
          </h2>
          <p className="font-amiri text-lg dark:text-white">
            &#10078;
            {trimVerse(verse, 75)}
            &#10077;
          </p>
        </div>

        <p
          className="*:text-dark-orange dark:*:text-orange scrollbar max-h-96 rounded-md bg-white p-3 pt-1 text-lg *:font-bold dark:bg-inherit dark:text-white"
          dangerouslySetInnerHTML={{ __html: tafsir.text }}
        />
      </DialogContent>
    </Dialog>
  );
}
