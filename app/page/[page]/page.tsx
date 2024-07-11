import PageNavigate from "@/components/readingPage/PageNavigate";
import PageNumber from "@/components/readingPage/PageNumber";
import SaveBookmark from "@/components/readingPage/SaveBookmark";
import { removeTashkeel } from "@/lib/utils";
import Ayahs from "@/components/readingPage/Ayahs";
import { Suspense } from "react";

type Params = {
  params: {
    page: string;
  };
};

export default async function Page({ params }: Params) {
  const page = +params.page;
  if (page >= 1 && page <= 604) {
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/page/${page}`);
      const data = await res.json();
      const ayahs = data.data.ayahs;
      const surahsNames = Object.values(data.data.surahs).map(
        (surah: any) => surah.name.split("سُورَةُ ")[1],
      );

      return (
        <>
          <div className="container flex h-[inherit] flex-col gap-8">
            <SaveBookmark page={page} />
            <span className="absolute left-28 top-6 block text-sm text-white sm:left-36 sm:top-8 sm:text-lg">
              {surahsNames.map(
                (surahName, index) =>
                  removeTashkeel(surahName) +
                  (index + 1 < surahsNames.length ? " | " : ""),
              )}
            </span>

            <Suspense>
              <Ayahs ayahs={ayahs} page={page} />
            </Suspense>

            <PageNumber page={page} />
            {page > 1 && (
              <PageNavigate href={`/page/${page - 1}`} direction="right" />
            )}
            {page < 604 && (
              <PageNavigate href={`/page/${page + 1}`} direction="left" />
            )}
          </div>
        </>
      );
    } catch (error) {
      return (
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
          حدث خطأ في استحضار البيانات
        </h1>
      );
    }
  }

  return (
    <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
      هذه الصفحة ليست موجودة ، اختر صفحة بين 1 و 604
    </h1>
  );
}
