// src/components/LinkProcessor/LinkProcessor.tsx
interface Link {
  word: string;
  link: string;
}

interface LinkProcessorProps {
  description: string;
  internalLinks: Link[];
  externalLinks: Link[];
}

const LinkProcessor = ({
  description,
  internalLinks,
  externalLinks,
}: LinkProcessorProps) => {
  const processDescription = (
    text: string,
    links: Link[],
    isInternal: boolean
  ) => {
    let processedText = text;

    links.forEach((link) => {
      const regex = new RegExp(`\\b${link.word}\\b`, "gi");
      processedText = processedText.replace(
        regex,
        `<a href="${link.link}" target="${
          isInternal ? "_self" : "_blank"
        }" rel="${
          isInternal ? "" : "noopener noreferrer"
        }" style="color: #fc3e02; text-decoration: underline;">${link.word}</a>`
      );
    });

    return processedText;
  };

  // First process internal links, then external links
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
      dangerouslySetInnerHTML={{
        __html: processedDescription,
      }}
    />
  );
};

export default LinkProcessor;
