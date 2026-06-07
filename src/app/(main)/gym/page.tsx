import { getGymBranches } from "@/services/gymBranch.server";
import GymGrid from "./_components/gym-grid/GymGrid";
import GymSearchHeader from "./_components/gym-search-header/GymSearchHeader";

type GymPageProps = {
  searchParams: Promise<{
    query?: string | string[];
  }>;
};

export default async function GymPage({ searchParams }: GymPageProps) {
  const { query: queryParam } = await searchParams;
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam;
  const trimmedQuery = query?.trim();
  const gyms = await getGymBranches(trimmedQuery);

  return (
    <>
      <GymSearchHeader query={trimmedQuery ?? ""} />
      <div className="mx-auto w-full max-w-7xl px-gutter py-lg">
        <GymGrid gyms={gyms} query={trimmedQuery ?? ""} />
      </div>
    </>
  );
}
