// src / app / component / renderNews / renderNews.tsx;

"use client";
import { useState } from "react";
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
  newsLocale, // Changed prop name to newsLocale
  limit,
  startIndex = 0,
}: {
  newsLocale: NewsItemType[]; // Updated type to match the new prop name
  limit?: number;
  startIndex?: number;
}) => {
  // Slice the news data based on limit and startIndex
  const limitedNews = limit
    ? newsLocale.slice(startIndex, startIndex + limit)
    : newsLocale.slice(startIndex);

  return (
    <div className="render-news-container">
      {limitedNews.length > 0 ? (
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
