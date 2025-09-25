const fs = require("fs");
const path = require("path");

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

  fs.appendFile("./data/chapters.ts", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

// getChapters();

async function getVerses() {
  const DATA = [];
  for (let i = 1; i <= 604; ++i) {
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/page/${i}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch data for page ${i}`);
      }
      const D = await res.json();

      const surahs = Object.values(D.data.surahs).map((surah) => ({
        name: surah.name,
        number: surah.number,
        numberOfVerses: surah.numberOfVerses,
        revelationType: surah.revelationType,
      }));

      const verses = D.data.ayahs.map(
        /*async*/ (verse) => {
          const verseKey = `${verse.surah.number}:${verse.numberInSurah}`;
          // const tafsirFetch = await fetch(
          //   `https://api.quran.com/api/v4/tafsirs/16/by_ayah/${verse.surah.number}:${verse.numberInSurah}?language=ar`,
          // );
          // const { tafsir } = await tafsirFetch.json();
          return {
            id: verse.number,
            numberInSurah: verse.numberInSurah,
            surah: {
              name: verse.surah.name,
              number: verse.surah.number,
            },
            text: verse.text,
            key: verseKey,
            // tafsir,
          };
        },
      );

      DATA.push({ surahs, verses });
    } catch (err) {
      console.error(err);
    }
  }

  const dir = path.join(__dirname, "new");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFile(
    path.join(dir, "verses.json"),
    JSON.stringify(DATA, null, 2),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Saved verses.json successfully!");
      }
    },
  );
}

// getVerses();

const versesData = require("./new/verses.json");

function addVersesIds() {
  let verseCounter = 0;
  for (let i = 0; i < 604; i++) {
    for (let j = 0; j < versesData[i].verses.length; j++) {
      delete versesData[i].verses[j].verseId;
      versesData[i].verses[j].id = ++verseCounter;
    }
  }

  const dir = path.join(__dirname, "new");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFile(
    path.join(dir, "verses.json"),
    JSON.stringify(versesData, null, 2),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Saved verses.json successfully!");
      }
    },
  );
}

addVersesIds();
