import RenderNews from "@/components/renderNews/renderNews";
import "@/styles/styles.scss";
import "@/components/gridView/gridView";
import dynamic from "next/dynamic";

const GridView = dynamic(() => import("@/components/gridView/gridView"));

type NewsData = any;

export default async function Home() {
  const fetchNews = async (): Promise<NewsData> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchNews?locale=en`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
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

  const news = await fetchNews();

  return (
    <div>
      <div className="parent">
        <div className="parent-container">
          <div className="left">
            <RenderNews newsLocale={news} limit={1} />
          </div>
          <div className="right">
            <RenderNews newsLocale={news} limit={3} startIndex={1} />
          </div>
        </div>
        <h1 className="font-proximaBlack uppercase text-[38px] text-left mt-6 mx-[3.2vw]">
          Recent Updates
        </h1>
        <div className="news-cards">
          <RenderNews newsLocale={news} limit={2} startIndex={4} />
        </div>
        <h1 className="font-proximaBlack uppercase text-[38px] text-left my-[2vh] mx-[3.2vw]">
          Latest News
        </h1>
        <div>
          <GridView locale="en" />
        </div>
      </div>
    </div>
  );
}
