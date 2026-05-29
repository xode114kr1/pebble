import SummaryCard from "./_components/summary-card/SummaryCard";

export default function Home() {
  return (
    <div className=" px-gutter py-lg">
      <div className="grid grid-cols-1 gap-lg md:grid-cols-12">
        <SummaryCard />
      </div>
    </div>
  );
}
