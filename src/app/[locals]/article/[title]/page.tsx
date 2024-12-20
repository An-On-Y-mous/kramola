import { NextPage } from "next";
import Image from "next/image";

interface Params {
  slugtitle: string;
  locals: string;
  title: string;
}
interface Props {
  params: Params;
}

const ArticlePage: NextPage<Props> = async ({ params }) => {
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

  return (
    <div>
      <h1>{newsItem.title}</h1>
      <p>{newsItem.description}</p>
      <p>{newsItem.date}</p>
    </div>
  );
};

export default ArticlePage;
