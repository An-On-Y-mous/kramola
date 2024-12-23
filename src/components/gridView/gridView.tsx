"use client";

import { useState, useEffect } from "react";
import RenderNews from "../renderNews/renderNews";

type NewsData = any;

interface GridViewProps {
  locale: string;
}

const ITEMS_PER_ROW = 4;
const INITIAL_ROWS = 2;

const GridView = ({ locale }: GridViewProps) => {
  const [visibleRows, setVisibleRows] = useState(INITIAL_ROWS);
  const [news, setNews] = useState<NewsData>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNews = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchNews?locale=${locale}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNews(data);
    } catch (error) {
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [locale]);

  const handleLoadMore = () => {
    setVisibleRows((prevRows) => prevRows + 2);
  };

  const visibleItems = visibleRows * ITEMS_PER_ROW;
  const hasMoreItems = news.length > visibleItems;

  return (
    <div className="grid-view">
      <RenderNews newsLocale={news} startIndex={7} limit={visibleItems} />

      {hasMoreItems && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="px-6 py-2 bg-[#222222] text-white rounded-md disabled:bg-gray-400"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default GridView;
