type Locale = "ru" | "es" | "en";

export function validateLocale(locale: string): Locale {
  const validLocales: Locale[] = ["ru", "es", "en"];
  return validLocales.includes(locale as Locale) ? (locale as Locale) : "en";
}
