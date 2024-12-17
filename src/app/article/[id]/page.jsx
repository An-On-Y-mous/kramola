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
    <div className="article-parent">
      <div className="article-container">
        <div className="article-image">
          {newsItem.img_url ? (
            <Image
              src={newsItem.img_url}
              alt={newsItem.title}
              width={1200}
              height={800}
            />
          ) : (
            <div>Image not available</div>
          )}
        </div>
        <div className="article-title">
          <h1>{newsItem.title}</h1>
        </div>

        <div
          className="article-description"
          dangerouslySetInnerHTML={{
            __html: newsItem.description,
          }}
        />
        <div className="date-read">
          <div className="article-read-more">
            {newsItem.source_url && (
              <Link
                href={newsItem.source_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Full Article
              </Link>
            )}
          </div>
          <div className="article-date">
            <p>
              {new Date(newsItem.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="article-more-news">
        <h1>More News</h1>
      </div>
      <div className="grid-view">
        <RenderNews startIndex={7} />
      </div> */}
    </div>
  );
}
