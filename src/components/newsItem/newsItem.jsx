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
      <div className="news-container">
        <div className="news-image">
          <Link
            href={
              !locale || locale === "en"
                ? `/article/${slugTitle}`
                : `/${locale}/article/${slugTitle}`
            }
          >
            <Image
              src={img_url || "/default-fallback-image.png"}
              width={1200}
              height={600}
              alt="image"
            />
          </Link>
        </div>
        <div className="news-subcontainer">
          <div className="news-title">
            <Link
              href={
                !locale || locale === "en"
                  ? `/article/${slugTitle}`
                  : `/${locale}/article/${slugTitle}`
              }
            >
              <h3>{title}</h3>
            </Link>
          </div>
          <div>
            <Link
              href={
                !locale || locale === "en"
                  ? `/article/${slugTitle}`
                  : `/${locale}/article/${slugTitle}`
              }
            >
              <div
                className="news-description"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </Link>
          </div>

          <div className="date-read">
            <div className="news-read-more-link">
              <Link
                href={
                  intReadMore
                    ? locale
                      ? `/${locale}/article/${slugTitle}`
                      : `/article/${slugTitle}`
                    : source_url
                }
                target={intReadMore ? "" : "_blank"}
                rel="noopener noreferrer"
              >
                Read More
              </Link>
            </div>
            <div className="news-date">
              <Link
                href={
                  !locale || locale === "en"
                    ? `/article/${slugTitle}`
                    : `/${locale}/article/${slugTitle}`
                }
              >
                <p>
                  {date
                    ? new Date(date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Loading..."}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
