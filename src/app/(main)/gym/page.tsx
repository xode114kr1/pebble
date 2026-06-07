import { getGymBranches } from "@/services/gymBranch.server";
import GymGrid from "./_components/gym-grid/GymGrid";
import GymSearchHeader from "./_components/gym-search-header/GymSearchHeader";

export default async function GymPage() {
  const gyms = await getGymBranches();

  return (
    <>
      <GymSearchHeader />
      <div className="mx-auto w-full max-w-7xl px-gutter py-lg">
        <GymGrid gyms={gyms} />
      </div>
    </>
  );
}
