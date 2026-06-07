import { GymBranchListItem } from "@/types/gym";
import GymCard from "../gym-card/GymCard";

export default function GymGrid({ gyms }: { gyms: GymBranchListItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-lg sm:grid-cols-2 xl:grid-cols-3">
      {gyms.map((gym) => (
        <GymCard key={gym.id} gym={gym} />
      ))}
    </div>
  );
}
