import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type BrandRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: BrandRouteContext) {
  try {
    const { id } = await params;
    const brandId = Number(id);

    if (!Number.isInteger(brandId) || brandId <= 0) {
      return NextResponse.json(
        { message: "올바른 브랜드를 선택해주세요." },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { name, difficultyColorIds } = body;
    const trimmedName = typeof name === "string" ? name.trim() : "";

    if (!trimmedName || !difficultyColorIds) {
      return NextResponse.json(
        { message: "브랜드 이름과 난이도 색상은 필수입니다." },
        { status: 400 },
      );
    }

    if (!Array.isArray(difficultyColorIds) || difficultyColorIds.length === 0) {
      return NextResponse.json(
        { message: "브랜드에 적용할 난이도 색상을 선택해주세요." },
        { status: 400 },
      );
    }

    const hasInvalidDifficultyColorId = difficultyColorIds.some(
      (difficultyColorId) =>
        !Number.isInteger(difficultyColorId) || difficultyColorId <= 0,
    );

    if (hasInvalidDifficultyColorId) {
      return NextResponse.json(
        { message: "올바른 난이도 색상을 선택해주세요." },
        { status: 400 },
      );
    }

    const uniqueDifficultyColorIds = new Set(difficultyColorIds);

    if (uniqueDifficultyColorIds.size !== difficultyColorIds.length) {
      return NextResponse.json(
        { message: "중복된 난이도 색상이 포함되어 있습니다." },
        { status: 400 },
      );
    }

    const brand = await prisma.brand.findUnique({
      where: {
        id: brandId,
      },
    });

    if (!brand) {
      return NextResponse.json(
        { message: "존재하지 않는 브랜드입니다." },
        { status: 404 },
      );
    }

    const existingBrand = await prisma.brand.findFirst({
      where: {
        name: trimmedName,
        NOT: {
          id: brandId,
        },
      },
    });

    if (existingBrand) {
      return NextResponse.json(
        { message: "이미 등록된 브랜드 이름입니다." },
        { status: 409 },
      );
    }

    const difficultyColorCount = await prisma.difficultyColor.count({
      where: {
        id: {
          in: difficultyColorIds,
        },
      },
    });

    if (difficultyColorCount !== difficultyColorIds.length) {
      return NextResponse.json(
        { message: "존재하지 않는 난이도 색상이 포함되어 있습니다." },
        { status: 400 },
      );
    }

    const updatedBrand = await prisma.$transaction(async (tx) => {
      await tx.brandColor.deleteMany({
        where: {
          brandId,
        },
      });

      return tx.brand.update({
        where: {
          id: brandId,
        },
        data: {
          name: trimmedName,
          colors: {
            create: difficultyColorIds.map((difficultyColorId, index) => ({
              difficultyColorId,
              order: index + 1,
            })),
          },
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
      });
    });

    return NextResponse.json(updatedBrand);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "브랜드 수정 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
