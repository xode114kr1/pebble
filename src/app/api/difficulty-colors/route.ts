import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.trim();

    const difficultyColors = await prisma.difficultyColor.findMany({
      where: query
        ? {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                colorCode: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          }
        : undefined,
      select: {
        id: true,
        name: true,
        colorCode: true,
      },
    });

    return NextResponse.json(difficultyColors);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "난이도 색상 목록 조회 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, colorCode } = body;

    if (!name || !colorCode) {
      return NextResponse.json(
        { message: "색상명과 색상 코드는 필수입니다." },
        { status: 400 },
      );
    }

    const hexColorRegex = /^#([0-9A-Fa-f]{6})$/;

    if (!hexColorRegex.test(colorCode)) {
      return NextResponse.json(
        { message: "올바른 HEX 색상 코드를 입력해주세요." },
        { status: 400 },
      );
    }

    const difficultyColor = await prisma.difficultyColor.create({
      data: {
        name,
        colorCode,
      },
    });

    return NextResponse.json(difficultyColor, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "색상 추가 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
