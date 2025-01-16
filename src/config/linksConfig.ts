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
    link: "/article/how-to-not-lose-it-completely-during-trumps-second-presidency",
    translations: { ru: "Байден", es: "Biden" },
  },
];

export const externalLinks = [
  {
    word: "rulemakings",
    link: "https://example-site.com",
    translations: { ru: "регламенты", es: "reglamentos" },
  },
];
