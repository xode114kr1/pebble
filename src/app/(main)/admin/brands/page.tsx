import { getAdminGymBrands } from "@/services/brand.server";
import AdminBrandClient from "./_components/admin-brand-client/AdminBrandClient";

type AdminBrandsPageProps = {
  searchParams: Promise<{
    query?: string | string[];
  }>;
};

export default async function AdminBrandsPage({
  searchParams,
}: AdminBrandsPageProps) {
  const { query: queryParam } = await searchParams;
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam;
  const trimmedQuery = query?.trim();
  const brands = await getAdminGymBrands(trimmedQuery);

  return (
    <div className="space-y-xl px-gutter py-lg">
      <AdminBrandClient brands={brands} query={trimmedQuery ?? ""} />
    </div>
  );
}
