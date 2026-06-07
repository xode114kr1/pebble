import { GymBranchListItem } from "@/types/gym";
import GymCard from "../gym-card/GymCard";
import GymEmptyState from "../gym-empty-state/GymEmptyState";

export default function GymGrid({
  gyms,
  query,
}: {
  gyms: GymBranchListItem[];
  query: string;
}) {
  if (gyms.length === 0) {
    return <GymEmptyState query={query} />;
  }

  return (
    <div className="grid grid-cols-1 gap-lg sm:grid-cols-2 xl:grid-cols-3">
      {gyms.map((gym) => (
        <GymCard key={gym.id} gym={gym} />
      ))}
    </div>
  );
}
