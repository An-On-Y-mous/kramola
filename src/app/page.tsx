import RenderNews from "@/components/renderNews/renderNews";
import "@/styles/styles.scss";
export default function Home() {
  return (
    <div className="parent">
      <div className="parent-container">
        <div className="left">
          <RenderNews limit={1} />
        </div>
        <div className="right">
          <RenderNews limit={4} startIndex={1} />
        </div>
      </div>
      <div className="grid-view">
        <RenderNews startIndex={5} />
      </div>
    </div>
  );
}
