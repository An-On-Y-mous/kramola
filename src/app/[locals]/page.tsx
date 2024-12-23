import GridView from "@/components/gridView/gridView";
import RenderNews from "@/components/renderNews/renderNews";
import "@/styles/styles.scss";

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
}

async function fetchNews(locale: string): Promise<NewsItemType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fetchNews?locale=${locale}`
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
              limit={4}
              startIndex={1}
              locale={locals}
            />
          </div>
        </div>
        <div className="news-cards">
          <RenderNews newsLocale={news} limit={2} startIndex={5} />
        </div>
        <h1 className="font-proximaBlack uppercase text-[38px] text-center my-[3vh] mx-auto">
          Latest News
        </h1>
        <div>
          <GridView locale={locals} />
        </div>
      </div>
    </div>
  );
}
