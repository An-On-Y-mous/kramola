import RenderNews from "@/components/renderNews/renderNews";
export default function Home() {
  return (
    <div className="parent">
      <div className="parent-container">
        <div className="left">
          <RenderNews />
        </div>
        <div className="right">
          <RenderNews />
        </div>
      </div>
      <div className="grid-view">
        <RenderNews />
      </div>
    </div>
  );
}
