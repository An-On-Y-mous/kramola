"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import "./article.scss";

export default function ArticlePage() {
  const params = useParams();
  const [newsItem, setNewsItem] = useState({});

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchArticle/${params.id}`
      );
      const data = await response.json();
      setNewsItem(data);
    };

    fetchArticle();
  }, [params.id]);

  return (
    <div className="article-page">
      <div className="article-container">
        <div className="article-header">
          <h1 className="article-title">{newsItem.title || "Loading..."}</h1>
          <p className="article-date">
            {newsItem.date
              ? new Date(newsItem.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Loading..."}
          </p>
        </div>

        <div className="article-image">
          {newsItem.img_url ? (
            <Image
              src={newsItem.img_url}
              alt={newsItem.title || "Article Image"}
              width={200}
              height={300}
            />
          ) : (
            <div>Image not available</div>
          )}
        </div>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{
            __html: newsItem.description || "Loading article content...",
          }}
        />

        <div className="article-actions">
          {newsItem.source_url && (
            <Link
              href={newsItem.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-full-article-btn"
            >
              Read Full Article
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
