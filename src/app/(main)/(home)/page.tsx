import CommunityCard from "./_components/community-card/CommunityCard";
import RecentSuccessRate from "./_components/recent-success-rate/RecentSuccessRate";
import SmallCalendar from "./_components/small-calendar/SmallCalendar";
import SummaryCard from "./_components/summary-card/SummaryCard";

export default function Home() {
  return (
    <div className=" px-gutter py-lg">
      <div className="grid grid-cols-1 gap-lg md:grid-cols-12">
        <SummaryCard />
        <RecentSuccessRate />
        <SmallCalendar />
        <CommunityCard />
      </div>
    </div>
  );
}
