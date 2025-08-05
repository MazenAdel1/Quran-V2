import React, { Fragment } from "react";
import ChapterTitle from "./ChapterTitle";
import { VerseProps } from "@/types/VerseTypes";
import Verse from "./Verse";

export default function Verses({ verses, page }: any) {
  return (
    <div className="font-amiri xs:text-[22px] xs:leading-[2.6] h-full w-full text-[20px] leading-[2.4] text-black sm:text-[24px] sm:leading-[2.7] md:text-[26px] md:leading-[2.6] lg:text-[29px] lg:leading-[2.9] xl:text-[32px] xl:leading-[3] dark:text-white">
      {verses.map((verse: VerseProps) =>
        verse.numberInSurah === 1 ? (
          <Fragment key={verse.numberInSurah}>
            <ChapterTitle chapterTitle={verse.surah.name} />
            {verse.text.includes("ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ") &&
            page !== 1 ? (
              <>
                <span
                  key={verse.numberInSurah}
                  className="font-camel block text-center font-bold"
                >
                  بسم الله الرحمـٰن الرحيم
                </span>
                <Verse
                  verse={{
                    ...verse,
                    text: verse.text.split(
                      "ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ",
                    )[1],
                  }}
                />
              </>
            ) : (
              <Verse verse={verse} />
            )}
          </Fragment>
        ) : (
          <Verse verse={verse} key={verse.numberInSurah} />
        ),
      )}
    </div>
  );
}
