import { prisma } from "@/lib/prisma";
import { GymBranchListItem, GymBrandSummary } from "@/types/gym";
import { formatDateKey } from "@/utils/date";

function mapBrandToGymBrandSummary(brand: {
  id: number;
  name: string;
  colors: {
    difficultyColor: {
      id: number;
      name: string;
      colorCode: string;
    };
  }[];
}): GymBrandSummary {
  return {
    id: brand.id,
    name: brand.name,
    gradeColors: brand.colors.map(({ difficultyColor }) => ({
      id: String(difficultyColor.id),
      name: difficultyColor.name,
      color: difficultyColor.colorCode,
    })),
  };
}

export async function getAdminGymPageData(query?: string): Promise<{
  brands: GymBrandSummary[];
  gymlist: GymBranchListItem[];
}> {
  const trimmedQuery = query?.trim();

  const [branches, brands] = await Promise.all([
    prisma.gymBranch.findMany({
      where: trimmedQuery
        ? {
            OR: [
              {
                name: {
                  contains: trimmedQuery,
                  mode: "insensitive",
                },
              },
              {
                location: {
                  contains: trimmedQuery,
                  mode: "insensitive",
                },
              },
              {
                brand: {
                  name: {
                    contains: trimmedQuery,
                    mode: "insensitive",
                  },
                },
              },
            ],
          }
        : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        brand: {
          include: {
            colors: {
              orderBy: {
                order: "asc",
              },
              include: {
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
        },
      },
    }),
    prisma.brand.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        colors: {
          orderBy: {
            order: "asc",
          },
          include: {
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
    }),
  ]);

  return {
    brands: brands.map(mapBrandToGymBrandSummary),
    gymlist: branches.map((branch) => ({
      id: branch.id,
      brandId: branch.brandId,
      branchName: branch.name,
      location: branch.location,
      createdAt: formatDateKey(branch.createdAt),
      brand: mapBrandToGymBrandSummary(branch.brand),
    })),
  };
}
