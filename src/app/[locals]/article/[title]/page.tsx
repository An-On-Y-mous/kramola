import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import "@/styles/article.scss";

// Define the params interface
interface Params {
  locals: string;
  title: string;
}

// Define the props interface for the page component
interface Props {
  params: Params;
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Define the news item interface
interface NewsItem {
  img_url: string;
  title: string;
  description: string;
  date: string;
  source_url: string;
}

// Use the correct Next.js page type definition
const ArticlePage = async ({ params }: Props) => {
  const { title, locals } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchArticle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slugtitle: title, locale: locals }),
    }
  );

  const { newsItem }: { newsItem: NewsItem } = await res.json();

  return (
    <div className="article-main">
      <div className="article-container">
        <div className="article-img">
          <Image
            src={newsItem.img_url}
            alt={newsItem.title}
            width={1280}
            height={720}
          />
        </div>
        <h1 className="article-title">{newsItem.title}</h1>
        <p className="article-description">{newsItem.description}</p>

        <div className="article-subcontainer">
          <p className="article-date">
            {new Date(newsItem.date).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <Link
            className="articel-read-more"
            href={newsItem.source_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
