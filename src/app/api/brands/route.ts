import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.trim();

    const brands = await prisma.brand.findMany({
      where: query
        ? {
            name: {
              contains: query,
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

    return NextResponse.json(brands);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "브랜드 목록 조회 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const existingBrand = await prisma.brand.findUnique({
      where: {
        name: trimmedName,
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

    const brand = await prisma.brand.create({
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

    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "브랜드 등록 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
