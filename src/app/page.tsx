import RenderNews from "@/components/renderNews/renderNews";
import "@/styles/styles.scss";

export default async function Home() {
  // State to hold news data

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchNews?locale=en`
      ); // Adjust the locale as needed
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
    }
  };
  const news = await fetchNews();

  return (
    <div>
      <div className="parent">
        <div className="parent-container">
          <div className="left">
            <RenderNews newsLocale={news} limit={1} />{" "}
            {/* Pass news as newsLocale */}
          </div>
          <div className="right">
            <RenderNews newsLocale={news} limit={5} startIndex={1} />{" "}
            {/* Pass news as newsLocale */}
          </div>
        </div>
        <h1 className="font-bebas text-[48px] text-center my-[3vh] mx-auto">
          Latest News
        </h1>
        <div className="grid-view">
          <RenderNews newsLocale={news} startIndex={6} />{" "}
          {/* Pass news as newsLocale */}
        </div>
      </div>
    </div>
  );
}
