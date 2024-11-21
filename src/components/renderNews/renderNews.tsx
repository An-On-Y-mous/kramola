"use client";
import { useEffect, useState } from "react";
import "./renderNews.scss";
import NewsItem from "../newsItem/newsItem";

interface NewsItemType {
  id?: number;
  title: string;
  description: string;
  date: string;
  img_url: string;
  source_url: string;
}

const RenderNews = ({
  limit,
  startIndex = 0,
}: {
  limit?: number;
  startIndex?: number;
}) => {
  const [news, setNews] = useState<NewsItemType[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchNews`
      );

      const data: NewsItemType[] = await response.json();

      const limitedNews = limit
        ? data.slice(startIndex, startIndex + limit)
        : data.slice(startIndex);

      setNews(limitedNews);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="render-news-container">
      {news.length > 0 ? (
        <div className="render-news">
          <ul>
            {news.map((value, index) => (
              <li key={index}>
                <NewsItem
                  id={value.id}
                  title={value.title}
                  description={value.description}
                  date={value.date}
                  img_url={value.img_url}
                  source_url={value.source_url}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
};

export default RenderNews;
