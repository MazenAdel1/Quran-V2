import PageNavigate from "@/components/readingPage/PageNavigate";
import PageNumber from "@/components/readingPage/PageNumber";
import SaveBookmark from "@/components/readingPage/SaveBookmark";
import { normalizeArabic } from "@/lib/utils";
import Verses from "@/components/readingPage/Verses";
import versesData from "@/data/verses.json";

type Params = Promise<{ page: number }>;

export async function generateStaticParams() {
  return Array.from({ length: 604 }, (_, i) => ({ page: (i + 1).toString() }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { page } = await params;

  return {
    title: `قرآن - صفحة ${page}`,
  };
}

export default async function Page({ params }: { params: Params }) {
  let { page } = await params;
  page = +page;

  if (page >= 1 && page <= 604) {
    const data = versesData[page - 1];
    const verses = data.verses;
    const chaptersNames = Object.values(data.surahs).map(
      (chapter: any) => chapter.name.split("سُورَةُ ")[1],
    );

    return (
      <div className="container flex h-[inherit] flex-col gap-8">
        <SaveBookmark page={page} />
        <span className="absolute top-4 left-28 block text-sm text-black sm:top-5 sm:left-36 sm:text-lg md:top-8 md:left-40 dark:text-white">
          {chaptersNames.map(
            (chapterName, index) =>
              normalizeArabic(chapterName) +
              (index + 1 < chaptersNames.length ? " | " : ""),
          )}
        </span>

        <Verses verses={verses} page={page} />

        <PageNumber page={page} />
        {page > 1 && (
          <PageNavigate href={`/page/${page - 1}`} direction="right" />
        )}
        {page < 604 && (
          <PageNavigate href={`/page/${page + 1}`} direction="left" />
        )}
      </div>
    );
  }

  return (
    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
      هذه الصفحة ليست موجودة ، اختر صفحة بين 1 و 604
    </h1>
  );
}
