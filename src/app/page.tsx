"use client";
import RenderNews from "@/components/renderNews/renderNews";
import { useState, useEffect } from "react";
import "@/styles/styles.scss";
import Loader from "@/app/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]); // State to hold news data

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchNews?locale=en`
        ); // Adjust the locale as needed
        const data = await response.json();
        setNews(data); // Set the fetched news data
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="parent">
          <div className="parent-container">
            <div className="left">
              <RenderNews newsLocale={news} limit={1} />{" "}
              {/* Pass news as newsLocale */}
            </div>
            <div className="right">
              <RenderNews newsLocale={news} limit={5} startIndex={1} />{" "}
              {/* Pass news as newsLocale */}
            </div>
          </div>
          <h1 className="font-bebas text-[48px] text-center my-[3vh] mx-auto">
            Latest News
          </h1>
          <div className="grid-view">
            <RenderNews newsLocale={news} startIndex={6} />{" "}
            {/* Pass news as newsLocale */}
          </div>
        </div>
      )}
    </div>
  );
}
