import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const DEFAULT_PAGE_SIZE = 20;

function parsePositiveInteger(value: string | null) {
  if (!value) {
    return null;
  }

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    return null;
  }

  return parsedValue;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parsePositiveInteger(searchParams.get("page"));
    const pageSize = parsePositiveInteger(searchParams.get("pageSize"));
    const shouldPaginate = page !== null || pageSize !== null;
    const take = shouldPaginate ? (pageSize ?? DEFAULT_PAGE_SIZE) : undefined;
    const skip =
      shouldPaginate && take !== undefined ? ((page ?? 1) - 1) * take : undefined;

    const gymBranches = await prisma.gymBranch.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take,
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

    return NextResponse.json(gymBranches);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "암장 지점 목록 조회 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
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
      },
    });

    if (existingBranch) {
      return NextResponse.json(
        { message: "이미 등록된 지점명입니다." },
        { status: 409 },
      );
    }

    const gymBranch = await prisma.gymBranch.create({
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

    return NextResponse.json(gymBranch, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "암장 지점 등록 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
