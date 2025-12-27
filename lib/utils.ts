import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeArabic(word: string) {
  return word
    .replace(
      /[\u0610-\u061A\u064B-\u0652\u0654-\u065F\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g,
      "",
    )
    .replace(/\u0671/g, "ا")
    .replace(/\u0640\u0670/g, "ا")
    .replace(/\u0670/g, "ا")
    .replace(/[\u0649\u06CC]/g, "ي")
    .replace(/ؤ/g, "و");
}

import versesData from "@/data/verses.json";

export function verseSearch(query: string): Promise<VerseProps[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const normalizedQuery = normalizeArabic(query);
      const results: VerseProps[] = [];

      versesData.forEach((page) => {
        page.verses.forEach((verse) => {
          const normalizedVerseText = normalizeArabic(verse.text);
          if (normalizedVerseText.includes(normalizedQuery)) {
            results.push(verse as VerseProps);
          }
        });
      });

      resolve(results);
    }, 0);
  });
}

import { VerseProps } from "@/types/VerseTypes";

export function trimVerse(verse: VerseProps, length: number) {
  return `${verse.text.slice(0, length)} ${verse.text.length > length ? "..." : ""} ${` \u06DD${verse.numberInSurah}`}`;
}

export function getVersePageInfoFromId(verseId: number) {
  let pageNumber;

  return {
    ...versesData.find((page, index) =>
      page.verses.find((item) => {
        pageNumber = index + 1;
        return item.id == verseId;
      }),
    ),
    pageNumber,
  };
}
