import { prisma } from "@/lib/prisma";
import { formatDateKey } from "@/utils/date";
import AdminBrandClient from "./_components/admin-brand-client/AdminBrandClient";

export default async function AdminBrandsPage() {
  const brands = await prisma.brand.findMany({
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
      <AdminBrandClient brands={brandItems} />
    </div>
  );
}
