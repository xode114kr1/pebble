import { prisma } from "@/lib/prisma";
import { formatDateKey } from "@/utils/date";
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

  const brands = await prisma.brand.findMany({
    where: trimmedQuery
      ? {
          name: {
            contains: trimmedQuery,
            mode: "insensitive",
          },
        }
      : undefined,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      colors: {
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          order: true,
          difficultyColor: {
            select: {
              id: true,
              name: true,
              colorCode: true,
            },
          },
        },
      },
    },
  });

  const brandItems = brands.map((brand) => ({
    ...brand,
    createdAt: formatDateKey(brand.createdAt),
    updatedAt: formatDateKey(brand.updatedAt),
  }));

  return (
    <div className="space-y-xl px-gutter py-lg">
      <AdminBrandClient brands={brandItems} query={trimmedQuery ?? ""} />
    </div>
  );
}
