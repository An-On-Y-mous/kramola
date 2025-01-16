/*
Example Format:

----Internal Linking----
{
  word: "word",
  link: "/internal-link-1",
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
    link: "/internal-link-1",
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
