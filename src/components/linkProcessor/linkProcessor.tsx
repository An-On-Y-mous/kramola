import "@/styles/article.scss";
import { validateLocale } from "@/utils/validateLocale";

type Locale = "ru" | "es" | "en";

interface Link {
  word: string;
  link: string;
  translations?: {
    [key in Locale]?: string;
  };
}

interface LinkProcessorProps {
  description: string;
  internalLinks: Link[];
  externalLinks: Link[];
  locale: string;
}

const LinkProcessor = ({
  description,
  internalLinks,
  externalLinks,
  locale,
}: LinkProcessorProps) => {
  const validatedLocale = validateLocale(locale);

  const processDescription = (
    text: string,
    links: Link[],
    isInternal: boolean
  ) => {
    let processedText = text;

    links.forEach((link) => {
      const wordToReplace = link.translations?.[validatedLocale] || link.word;

      if (validatedLocale === "ru") {
        const russianText = text.replace(
          new RegExp(wordToReplace, "giu"),
          (match) => {
            return `<a href="${link.link}" target="${
              isInternal ? "_self" : "_blank"
            }" rel="${
              isInternal ? "" : "noopener noreferrer"
            }" style="color: #fc3e02; text-decoration: underline;">${match}</a>`;
          }
        );
        processedText = russianText;
      } else {
        processedText = processedText.replace(
          new RegExp(`\\b${wordToReplace}\\b`, "gi"),
          `<a href="${link.link}" target="${
            isInternal ? "_self" : "_blank"
          }" rel="${
            isInternal ? "" : "noopener noreferrer"
          }" style="color: #fc3e02; text-decoration: underline;">${wordToReplace}</a>`
        );
      }
    });

    return processedText;
  };

  let processedDescription = processDescription(
    description,
    internalLinks,
    true
  );
  processedDescription = processDescription(
    processedDescription,
    externalLinks,
    false
  );

  return (
    <div
      className="article-description"
      dangerouslySetInnerHTML={{
        __html: processedDescription,
      }}
    />
  );
};

export default LinkProcessor;
