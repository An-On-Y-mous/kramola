/*
Example Format:

----Internal Linking----
{
  word: "word",
  link: "/article-link",
  translations: { ru: "слово", es: "palabra" },
}

----Authority Linking----
{
  word: "word",
  link: "https://authority-site.com",
  translations: { ru: "слово", es: "palabra" },
}
*/

export const internalLinks = [
  {
    word: "Trump",
    link: "/article/photo-collectiontrump-cabinet-stefanik",
    translations: { ru: "Трамп", es: "Trump" },
  },
];

export const externalLinks = [
  {
    word: "Elon Musk",
    link: "https://en.wikipedia.org/wiki/Elon_Musk",
    translations: { ru: "Илон Маск", es: "Elon Musk" },
  },
  {
    word: "Biden",
    link: "https://en.wikipedia.org/wiki/Joe_Biden",
    translations: { ru: "Байдена", es: "Biden" },
  },
  {
    word: "DEI",
    link: "https://en.wikipedia.org/wiki/Diversity,_equity,_and_inclusion",
    translations: { ru: "DEI", es: "DEI" },
  },
];
