import { NextPage } from "next";
import Image from "next/image";

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
    <div>
      <h1>{newsItem.title}</h1>
      <p>{newsItem.description}</p>
      <p>{newsItem.date}</p>
    </div>
  );
};

export default ArticlePage;
