import RenderNews from "@/components/renderNews/renderNews";
import "@/styles/styles.scss";

import dynamic from "next/dynamic";

const GridView = dynamic(() => import("@/components/gridView/gridView"));
interface NewsItemType {
  id?: number;
  title: string;
  description: string;
  date: string;
  img_url: string;
  source_url: string;
  slugTitle: string;
}

interface Params {
  locals: string;
  newsLocale: string;
}

async function fetchNews(locale: string): Promise<NewsItemType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchNews?locale=${locale}`,
    {
      cache: "no-cache",
    }
  );
  if (!response.ok) {
    return [];
  }
  return response.json();
}

export default async function LocalePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locals } = await params;
  const news = await fetchNews(locals);

  return (
    <div>
      <div className="parent">
        <div className="parent-container">
          <div className="left">
            <RenderNews newsLocale={news} limit={1} locale={locals} />
          </div>
          <div className="right">
            <RenderNews
              newsLocale={news}
              limit={3}
              startIndex={1}
              locale={locals}
            />
          </div>
        </div>
        <h1 className="font-proximaBlack uppercase text-[38px] text-left mt-6 mx-[3.2vw]">
          Recent Updates
        </h1>
        <div className="news-cards">
          <RenderNews
            newsLocale={news}
            limit={2}
            locale={locals}
            startIndex={4}
          />
        </div>
        <h1 className="font-proximaBlack uppercase text-[38px] text-left my-[3vh] mx-[3.2vw]">
          Latest News
        </h1>
        <div>
          <GridView locale={locals} />
        </div>
      </div>
    </div>
  );
}
