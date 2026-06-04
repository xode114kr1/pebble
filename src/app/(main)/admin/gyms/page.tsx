import { prisma } from "@/lib/prisma";
import { formatDateKey } from "@/utils/date";
import AdminGymClient from "./_components/admin-gym-client/AdminGymClient";

export default async function AdminGymsPage() {
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

  const brandItems = brands.map((brand) => ({
    id: brand.id,
    name: brand.name,
    gradeColors: brand.colors.map(({ difficultyColor }) => ({
      id: String(difficultyColor.id),
      name: difficultyColor.name,
      color: difficultyColor.colorCode,
    })),
  }));

  const gymlist = branches.map((branch) => ({
    id: branch.id,
    brandId: branch.brandId,
    branchName: branch.name,
    location: branch.location,
    createdAt: formatDateKey(branch.createdAt),
    brand: {
      id: branch.brand.id,
      name: branch.brand.name,
      gradeColors: branch.brand.colors.map(({ difficultyColor }) => ({
        id: String(difficultyColor.id),
        name: difficultyColor.name,
        color: difficultyColor.colorCode,
      })),
    },
  }));

  return (
    <div className="space-y-xl px-gutter py-lg">
      <AdminGymClient brands={brandItems} gymlist={gymlist} />
    </div>
  );
}
