import RenderNews from "@/components/renderNews/renderNews";
import "@/styles/styles.scss";

export default async function Home() {
  const fetchNews = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchNews?locale=en`
    );
    const data = await response.json();
    return data;
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
            <RenderNews newsLocale={news} limit={4} startIndex={1} />
          </div>
        </div>
        <div className="news-cards">
          <RenderNews newsLocale={news} limit={2} startIndex={5} />
        </div>
        <h1 className="font-proximaBlack uppercase text-[38px] text-center my-[2vh] mx-auto">
          Latest News
        </h1>
        <div className="grid-view">
          <RenderNews newsLocale={news} startIndex={7} />
        </div>
      </div>
    </div>
  );
}
