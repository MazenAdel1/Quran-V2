import { Fragment } from "react";
import SurahTitle from "@/components/readingPage/SurahTitle";
import PageNavigate from "@/components/readingPage/PageNavigate";
import PageNumber from "@/components/readingPage/PageNumber";
import SaveBookmark from "@/components/readingPage/SaveBookmark";
import { removeTashkeel } from "@/lib/utils";

type Params = {
  params: {
    page: string;
  };
};

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

export default async function Page({ params }: Params) {
  const page = +params.page;
  const res = await fetch(`https://api.alquran.cloud/v1/page/${page}`);
  const data = await res.json();
  const ayahs = data.data.ayahs;
  const surahsNames = Object.values(data.data.surahs).map(
    (surah: any) => surah.name.split("سُورَةُ ")[1],
  );

  return (
    <>
      {page >= 1 && page <= 604 ? (
        <div className="container flex h-[inherit] flex-col gap-10">
          <SaveBookmark page={page} />
          <span className="absolute left-28 top-6 block text-sm text-white sm:left-36 sm:top-8 sm:text-lg">
            {surahsNames.map(
              (surahName, index) =>
                removeTashkeel(surahName) +
                (index + 1 < surahsNames.length ? " | " : ""),
            )}
          </span>

          <div className="font-amiri text-2xl leading-[3.6rem] text-white sm:text-3xl sm:leading-[5rem] md:text-4xl md:leading-[6rem]">
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
                      <p className="inline px-1">{`${ayah.text.split("ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ")[1]} \u06DD${ayah.numberInSurah}`}</p>
                    </>
                  ) : (
                    <p className="inline px-1">
                      {ayah.text} {`\u06DD${ayah.numberInSurah}`}
                    </p>
                  )}
                </Fragment>
              ) : (
                <p className="inline px-1" key={ayah.numberInSurah}>
                  {ayah.text} {`\u06DD${ayah.numberInSurah}`}
                </p>
              ),
            )}
          </div>
          <PageNumber page={page} />
          {page > 1 && (
            <PageNavigate href={`/page/${page - 1}`} direction="right" />
          )}
          {page < 604 && (
            <PageNavigate href={`/page/${page + 1}`} direction={"left"} />
          )}
        </div>
      ) : (
        <h1 className="text-center text-3xl font-bold text-white">
          هذه الصفحة ليست موجودة
        </h1>
      )}
    </>
  );
}
