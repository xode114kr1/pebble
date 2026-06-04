import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type GymBranchRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: GymBranchRouteContext,
) {
  try {
    const { id } = await params;
    const gymBranchId = Number(id);

    if (!Number.isInteger(gymBranchId) || gymBranchId <= 0) {
      return NextResponse.json(
        { message: "올바른 암장 지점을 선택해주세요." },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { brandId, name, location } = body;
    const parsedBrandId = Number(brandId);
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedLocation =
      typeof location === "string" ? location.trim() : "";

    if (!Number.isInteger(parsedBrandId) || parsedBrandId <= 0) {
      return NextResponse.json(
        { message: "올바른 브랜드를 선택해주세요." },
        { status: 400 },
      );
    }

    if (!trimmedName || !trimmedLocation) {
      return NextResponse.json(
        { message: "지점명과 위치는 필수입니다." },
        { status: 400 },
      );
    }

    const gymBranch = await prisma.gymBranch.findUnique({
      where: {
        id: gymBranchId,
      },
    });

    if (!gymBranch) {
      return NextResponse.json(
        { message: "존재하지 않는 암장 지점입니다." },
        { status: 404 },
      );
    }

    const brand = await prisma.brand.findUnique({
      where: {
        id: parsedBrandId,
      },
    });

    if (!brand) {
      return NextResponse.json(
        { message: "존재하지 않는 브랜드입니다." },
        { status: 400 },
      );
    }

    const existingBranch = await prisma.gymBranch.findFirst({
      where: {
        brandId: parsedBrandId,
        name: trimmedName,
        NOT: {
          id: gymBranchId,
        },
      },
    });

    if (existingBranch) {
      return NextResponse.json(
        { message: "이미 등록된 지점명입니다." },
        { status: 409 },
      );
    }

    const updatedGymBranch = await prisma.gymBranch.update({
      where: {
        id: gymBranchId,
      },
      data: {
        brandId: parsedBrandId,
        name: trimmedName,
        location: trimmedLocation,
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
    });

    return NextResponse.json(updatedGymBranch);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "암장 지점 수정 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
