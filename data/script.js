const fs = require("node:fs");

async function getChapters() {
  const R = await fetch(`https://api.quran.com/api/v4/chapters`);
  const D = await R.json();

  const data = D.chapters.map((item) => ({
    id: item.id,
    page: item.pages[0],
    title: item.name_arabic,
    revelationPlace: item.revelation_place,
    versesCount: item.verses_count,
    bismillahPre: item.bismillah_pre,
  }));

  fs.appendFile("./data.ts", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

getChapters();

async function getAyahs() {
  const DATA = [];
  for (let i = 1; i <= 604; i++) {
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/page/${i}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data for page ${i}`);
      }
      const D = await res.json();

      const surahs = Object.values(D.data.surahs).map((surah) => ({
        name: surah.name,
        number: surah.number,
        numberOfAyahs: surah.numberOfAyahs,
        revelationType: surah.revelationType,
      }));

      const ayahs = D.data.ayahs.map((ayah) => ({
        numberInSurah: ayah.numberInSurah,
        surah: {
          name: ayah.surah.name,
        },
        text: ayah.text,
      }));

      DATA.push({ surahs, ayahs });
    } catch (err) {
      console.error(err);
    }
  }

  fs.appendFile(
    "./data/ayahs.ts",
    `export const ayahs = ${JSON.stringify(DATA)}`,
    (err) => {
      if (err) {
        console.error(err);
      }
    },
  );
}

getAyahs();
