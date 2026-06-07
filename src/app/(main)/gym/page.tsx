import GymGrid from "./_components/gym-grid/GymGrid";
import GymSearchHeader from "./_components/gym-search-header/GymSearchHeader";
import { gyms } from "./constants/gyms";

export default function GymPage() {
  return (
    <>
      <GymSearchHeader />
      <div className="mx-auto w-full max-w-7xl px-gutter py-lg">
        <GymGrid gyms={gyms} />
      </div>
    </>
  );
}
