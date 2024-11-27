"use client";
import RenderNews from "@/components/renderNews/renderNews";
import { useState, useEffect } from "react";
import "@/styles/styles.scss";
import Loader from "@/app/Loader";
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  });
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="parent">
          <div className="parent-container">
            <div className="left">
              <RenderNews limit={1} />
            </div>
            <div className="right">
              <RenderNews limit={5} startIndex={1} />
            </div>
          </div>
          <h1 className="font-bebas text-[48px] text-center my-[3vh] mx-auto">
            Latest News
          </h1>
          <div className="grid-view">
            <RenderNews startIndex={6} />
          </div>
        </div>
      )}
    </div>
  );
}
