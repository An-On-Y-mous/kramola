"use client";

import React, { use, useState, useEffect } from "react";
import RenderNews from "@/components/renderNews/renderNews";
import Loader from "@/app/Loader";
import "@/styles/styles.scss";

interface NewsItemType {
  id?: number;
  title: string;
  description: string;
  date: string;
  img_url: string;
  source_url: string;
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

export default function LocalePage({
  params,
}: {
  params: Promise<{ locals: string }>;
}) {
  const { locals } = use(params);

  const [news, setNews] = useState<NewsItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchNews(locals).then((newsData) => {
      setNews(newsData);
      setLoading(false);
    });
  }, [locals]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="parent">
        <div className="parent-container">
          <div className="left">
            <RenderNews newsLocale={news} limit={1} />
          </div>
          <div className="right">
            <RenderNews newsLocale={news} limit={5} startIndex={1} />
          </div>
        </div>
        <h1 className="font-bebas text-[48px] text-center my-[3vh] mx-auto">
          Latest News
        </h1>
        <div className="grid-view">
          <RenderNews newsLocale={news} startIndex={6} />
        </div>
      </div>
    </div>
  );
}
