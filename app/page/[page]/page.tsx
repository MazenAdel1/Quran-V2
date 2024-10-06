import PageNavigate from "@/components/readingPage/PageNavigate";
import PageNumber from "@/components/readingPage/PageNumber";
import SaveBookmark from "@/components/readingPage/SaveBookmark";
import { removeTashkeel } from "@/lib/utils";
import Ayahs from "@/components/readingPage/Ayahs";
import { Suspense } from "react";
import verses from "@/data/ayahs.json";

type Params = {
  params: {
    page: string;
  };
};

export default async function Page({ params }: Params) {
  const page = +params.page;
  let isLoading = false;

  if (page >= 1 && page <= 604) {
    try {
      const data = verses[page - 1];
      const ayahs = data.ayahs;
      const chaptersNames = Object.values(data.surahs).map(
        (chapter: any) => chapter.name.split("سُورَةُ ")[1],
      );

      return (
        <div className="container flex h-[inherit] flex-col gap-8">
          <SaveBookmark page={page} />
          <span className="absolute left-28 top-4 block text-sm text-black dark:text-white sm:left-36 sm:top-5 sm:text-lg md:left-40 md:top-8 ">
            {chaptersNames.map(
              (chapterName, index) =>
                removeTashkeel(chapterName) +
                (index + 1 < chaptersNames.length ? " | " : ""),
            )}
          </span>

          <Suspense fallback={<h2>تحميل البيانات</h2>}>
            <Ayahs ayahs={ayahs} page={page} isLoading={isLoading} />
          </Suspense>

          <PageNumber page={page} />
          {page > 1 && (
            <PageNavigate href={`/page/${page - 1}`} direction="right" />
          )}
          {page < 604 && (
            <PageNavigate href={`/page/${page + 1}`} direction="left" />
          )}
        </div>
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
