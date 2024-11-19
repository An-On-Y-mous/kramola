"use client";
import { useEffect, useState } from "react";
import "./renderNews.scss";
const RenderNews = () => {
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchNews`
      );
      const data = await response.json();
      // console.log(data);
      setNews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="news-container">
      {news.length > 0 ? (
        news.map((value, index) => (
          <div key={index} className="render-news">
            <ul>
              <div className="render-title">
                <li>{value.title}</li>
              </div>
              <div className="render-description">
                <div
                  dangerouslySetInnerHTML={{ __html: value.description }}
                ></div>
              </div>

              <div className="render-date">
                <li>{value.publishedat.slice(0, 10)}</li>
              </div>
            </ul>
          </div>
        ))
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
};

export default RenderNews;
