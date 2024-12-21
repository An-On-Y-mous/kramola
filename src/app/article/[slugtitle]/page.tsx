import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import "@/styles/article.scss";

interface Params {
  slugtitle: string;
  locale: string;
}
interface Props {
  params: Params;
}

const ArticlePage: NextPage<Props> = async ({ params }) => {
  const { slugtitle } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchArticle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slugtitle, locale: "en" }),
    }
  );

  const { newsItem } = await res.json();
  // console.log(newsItem);

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
          <Link className="articel-read-more" href={newsItem.source_url}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
