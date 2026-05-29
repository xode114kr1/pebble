import CommunityCard from "./_components/community-card/CommunityCard";
import RecentSuccessRate from "./_components/recent-success-rate/RecentSuccessRate";
import CalendarCard from "./_components/calendar-card/CalendarCard";
import SummaryCard from "./_components/summary-card/SummaryCard";

export default function Home() {
  return (
    <div className=" px-gutter py-lg">
      <div className="grid grid-cols-1 gap-lg lg:grid-cols-12">
        <SummaryCard />
        <RecentSuccessRate />
        <CalendarCard />
        <CommunityCard />
      </div>
    </div>
  );
}
