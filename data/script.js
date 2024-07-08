const fs = require("node:fs");

async function getData() {
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

getData();
