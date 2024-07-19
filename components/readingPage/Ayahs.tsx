"use client";

import React, { Fragment, useRef } from "react";
import SurahTitle from "./SurahTitle";

type AyahProps = {
  text: string;
  numberInSurah: number;
  surah: {
    number: number;
    name: string;
    revelationType: "Meccan" | "Medinan";
    numberOfAyahs: number;
  };
};

export default function Ayahs({ ayahs, page }: any) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden font-amiri text-[20px] leading-[2.4] text-black dark:text-white xs:text-[22px] xs:leading-[2.6] sm:text-[24px] sm:leading-[2.7] md:text-[26px] md:leading-[2.6] lg:text-[29px] lg:leading-[2.9] xl:text-[32px] xl:leading-[3]"
    >
      {ayahs.map((ayah: AyahProps) =>
        ayah.numberInSurah === 1 ? (
          <Fragment key={ayah.numberInSurah}>
            <SurahTitle surahName={ayah.surah.name} />
            {ayah.text.includes("ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ") &&
            page !== 1 ? (
              <>
                <span
                  key={ayah.numberInSurah}
                  className="block text-center font-camel font-bold"
                >
                  بسم الله الرحمـٰن الرحيم
                </span>
                <p className="inline px-1 [word-spacing:_-3px] sm:[word-spacing:_-4px]">{`${ayah.text.split("ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ")[1]}`}</p>
                {` \u06DD${ayah.numberInSurah} `}
              </>
            ) : (
              <>
                <p className="inline px-1 [word-spacing:_-3px] sm:[word-spacing:_-4px]">
                  {ayah.text}
                </p>
                {` \u06DD${ayah.numberInSurah} `}
              </>
            )}
          </Fragment>
        ) : (
          <Fragment key={ayah.numberInSurah}>
            <p className="inline px-1 [word-spacing:_-3px] sm:[word-spacing:_-4px]">
              {ayah.text}
            </p>
            {` \u06DD${ayah.numberInSurah} `}
          </Fragment>
        ),
      )}
    </div>
  );
}
