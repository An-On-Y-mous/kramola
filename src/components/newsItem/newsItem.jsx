import React from "react";
import "./newsItem.scss";
import Image from "next/image";
import Link from "next/link";

const NewsItem = ({ id, title, description, date, img_url, source_url }) => {
  return (
    <div className="news-item">
      <div className="news-image">
        <Image src={img_url} width={300} height={300} alt="image" />
      </div>

      <div className="news-title">
        <Link href={`/article/${id}`}>
          <h3>{title}</h3>
        </Link>
      </div>
      <div
        className="news-description"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <div className="news-read-more-link">
        <Link href={`${source_url}`} target="_blank" rel="noopener noreferrer">
          Read More
        </Link>
      </div>
      <div className="news-date">
        <p>{date.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default NewsItem;
