export type VerseProps = {
  text: string;
  numberInSurah: number;
  surah: {
    number: number;
    name: string;
    revelationType: "Meccan" | "Medinan";
    numberOfAyahs: number;
  };
  key: string;
};
