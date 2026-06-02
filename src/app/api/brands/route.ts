import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type CreateBrandRequestBody = {
  name?: unknown;
  difficultyColorIds?: unknown;
};

function isPositiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

function hasPrismaErrorCode(error: unknown, code: string) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === code
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateBrandRequestBody;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const difficultyColorIds = body.difficultyColorIds;

    if (!name) {
      return NextResponse.json(
        { message: "브랜드 이름은 필수입니다." },
        { status: 400 },
      );
    }

    if (!Array.isArray(difficultyColorIds) || difficultyColorIds.length === 0) {
      return NextResponse.json(
        { message: "브랜드에 적용할 난이도 색상을 선택해주세요." },
        { status: 400 },
      );
    }

    if (!difficultyColorIds.every(isPositiveInteger)) {
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

    const existingDifficultyColorCount = await prisma.difficultyColor.count({
      where: {
        id: {
          in: difficultyColorIds,
        },
      },
    });

    if (existingDifficultyColorCount !== difficultyColorIds.length) {
      return NextResponse.json(
        { message: "존재하지 않는 난이도 색상이 포함되어 있습니다." },
        { status: 400 },
      );
    }

    const brand = await prisma.brand.create({
      data: {
        name,
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

    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    console.error(error);

    if (hasPrismaErrorCode(error, "P2002")) {
      return NextResponse.json(
        { message: "이미 등록된 브랜드 이름입니다." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "브랜드 등록 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
