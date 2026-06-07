import { prisma } from "@/lib/prisma";
import { AdminGymBrand } from "@/types/gym";
import { formatDateKey } from "@/utils/date";

export async function getAdminGymBrands(query?: string): Promise<AdminGymBrand[]> {
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

  return brands.map((brand) => ({
    ...brand,
    createdAt: formatDateKey(brand.createdAt),
    updatedAt: formatDateKey(brand.updatedAt),
  }));
}
