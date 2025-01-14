import Image from "next/image";
import Link from "next/link";
import "@/styles/article.scss";
import dynamic from "next/dynamic";

const RenderNews = dynamic(() => import("@/components/renderNews/renderNews"));

interface Params {
  locals: string;
  title: string;
}

const ArticlePage = async ({ params }: { params: Promise<Params> }) => {
  const { title, locals } = await params;
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

  const { newsItem } = await res.json();

  const fetchNews = async (): Promise<any[]> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchNews?locale=${locals}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return [];
    }
  };

  const relatedNews = await fetchNews();
  // console.log(relatedNews);

  return (
    <div className="article-main">
      <div className="article-container">
        <div className="article-img">
          <Image
            src={newsItem.img_url || "/default-fallback-image.png"}
            alt={newsItem.title}
            width={1280}
            height={720}
          />
        </div>
        <h1 className="article-title">{newsItem.title}</h1>
        <p
          className="article-description"
          dangerouslySetInnerHTML={{ __html: newsItem.description }}
        />
        <div className="article-subcontainer">
          <p className="article-date">
            {new Date(newsItem.date).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <Link
            className="articel-read-more hidden"
            href={newsItem.source_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More
          </Link>
        </div>
      </div>
      <div className="divider">
        {/* <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-75 dark:via-neutral-400" /> */}
        <hr className="my-12 h-[1.5px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-75 dark:via-neutral-400" />
      </div>
      <div className="releated-news">
        <h2 className="text-center uppercase text-[34px] font-proximaBlack my-[3vh]">
          More{" "}
          <span className="text-[#fc3e02] font-proximaBlack">
            <Link href={"/"}>Politics</Link>
          </span>{" "}
          News
        </h2>
        <div className="grid-view">
          <RenderNews
            newsLocale={relatedNews}
            locale={locals}
            limit={4}
            startIndex={5}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
