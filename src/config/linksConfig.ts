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
    word: "Biden",
    link: "/article/musk-ramaswamy-put-spotlight-on-proliferation-of-us-regulations",
    translations: { ru: "Байдена", es: "Biden" },
  },
  {
    word: "Trump",
    link: "/article/how-to-not-lose-it-completely-during-trumps-second-presidency",
    translations: { ru: "Трамп", es: "Trump" },
  },
];

export const externalLinks = [
  {
    word: "Congressional Review Act",
    link: "https://en.wikipedia.org/wiki/Congressional_Review_Act",
    translations: {
      ru: "119",
      es: "Acto de Revisión del Congreso",
    },
  },
  {
    word: "Elon Musk",
    link: "https://en.wikipedia.org/wiki/Elon_Musk",
    translations: { ru: "Илон Маск", es: "Elon Musk" },
  },
];
