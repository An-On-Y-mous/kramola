import React from "react";
import "./newsItem.scss";

const NewsItem = ({ title, description, publishedAt }) => {
  return (
    <div className="news-item">
      <div className="render-title">
        <h3>{title}</h3>
      </div>
      <div
        className="render-description"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <div className="render-more-link">
        <a href="#">Read More</a>
      </div>
      <div className="render-date">
        <p>{publishedAt.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default NewsItem;
