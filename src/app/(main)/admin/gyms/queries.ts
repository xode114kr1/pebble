import { prisma } from "@/lib/prisma";
import { formatDateKey } from "@/utils/date";
import { GymBrand, GymBranchWithBrand } from "./types/adminGym";

function mapBrandToGymBrand(brand: {
  id: number;
  name: string;
  colors: {
    difficultyColor: {
      id: number;
      name: string;
      colorCode: string;
    };
  }[];
}): GymBrand {
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

export async function getAdminGymPageData(): Promise<{
  brands: GymBrand[];
  gymlist: GymBranchWithBrand[];
}> {
  const [branches, brands] = await Promise.all([
    prisma.gymBranch.findMany({
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
    brands: brands.map(mapBrandToGymBrand),
    gymlist: branches.map((branch) => ({
      id: branch.id,
      brandId: branch.brandId,
      branchName: branch.name,
      location: branch.location,
      createdAt: formatDateKey(branch.createdAt),
      brand: mapBrandToGymBrand(branch.brand),
    })),
  };
}
