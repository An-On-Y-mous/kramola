import React from "react";
import Image from "next/image";
import Link from "next/link";

const NewsItem = ({
  id,
  title,
  description,
  date,
  img_url,
  source_url,
  slugTitle,
  locale,
}) => {
  return (
    <div className="news-item">
      <div className="news-container">
        <div className="news-image">
          <Image src={img_url} width={1200} height={600} alt="image" />
        </div>
        <div className="news-subcontainer">
          <div className="news-title">
            <Link
              href={
                !locale
                  ? `/article/${slugTitle}`
                  : `/${locale}/article/${slugTitle}`
              }
            >
              <h3>{title}</h3>
            </Link>
          </div>
          <div
            className="news-description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
          <div className="date-read">
            <div className="news-read-more-link">
              <Link
                href={`${source_url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </Link>
            </div>
            <div className="news-date">
              <p>
                {date
                  ? new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Loading..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
