"use client";
import { useEffect, useState } from "react";
import "./renderNews.scss";
import NewsItem from "../newsItem/newsItem"; // Import the new NewsItem component

const RenderNews = () => {
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchNews`
      );
      const data = await response.json();
      setNews(data);
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
                  title={value.title}
                  description={value.description}
                  publishedAt={value.publishedat}
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
