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
  intReadMore = false,
}) => {
  return (
    <div className="news-item">
      <Link
        href={
          !locale || locale === "en"
            ? `/article/${slugTitle}`
            : `/${locale}/article/${slugTitle}`
        }
        className="news-container"
      >
        <span className="news-image">
          <Image
            src={img_url || "/default-fallback-image.png"}
            width={1200}
            height={600}
            alt="image"
          />
        </span>
        <span className="news-subcontainer">
          <span className="news-title">
            <h3>{title}</h3>
          </span>
          <span>
            <span
              className="news-description"
              dangerouslySetInnerHTML={{ __html: description }}
            ></span>
          </span>

          <span className="date-read">
            <span className="news-read-more-link">Read More</span>
            <span className="news-date">
              <p>
                {date
                  ? new Date(date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Loading..."}
              </p>
            </span>
          </span>
        </span>
      </Link>
    </div>
  );
};

export default NewsItem;
