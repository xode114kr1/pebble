import AdminGymClient from "./_components/admin-gym-client/AdminGymClient";
import { getAdminGymPageData } from "./queries";

type AdminGymsPageProps = {
  searchParams: Promise<{
    query?: string | string[];
  }>;
};

export default async function AdminGymsPage({
  searchParams,
}: AdminGymsPageProps) {
  const { query: queryParam } = await searchParams;
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam;
  const trimmedQuery = query?.trim();
  const { brands, gymlist } = await getAdminGymPageData(trimmedQuery);

  return (
    <div className="space-y-xl px-gutter py-lg">
      <AdminGymClient
        brands={brands}
        gymlist={gymlist}
        query={trimmedQuery ?? ""}
      />
    </div>
  );
}
