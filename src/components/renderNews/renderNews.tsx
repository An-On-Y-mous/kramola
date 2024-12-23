import NewsItem from "../newsItem/newsItem";

interface NewsItemType {
  id?: number;
  title: string;
  description: string;
  date: string;
  img_url: string;
  source_url: string;
  slugTitle: string;
}

const RenderNews = ({
  newsLocale,
  limit,
  startIndex = 0,
  locale,
}: {
  newsLocale: NewsItemType[];
  limit?: number;
  startIndex?: number;
  locale?: String;
}) => {
  const limitedNews = limit
    ? newsLocale.slice(startIndex, startIndex + limit)
    : newsLocale.slice(startIndex);

  return (
    <div className="render-news-container">
      {limitedNews.length > 0 && (
        <div className="render-news">
          <ul>
            {limitedNews.map((value, index) => (
              <li key={index}>
                <NewsItem
                  id={value.id}
                  title={value.title}
                  description={value.description}
                  date={value.date}
                  img_url={value.img_url}
                  source_url={value.source_url}
                  intReadMore={true}
                  slugTitle={value.slugTitle}
                  locale={locale}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RenderNews;
