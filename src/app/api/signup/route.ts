import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, nickname } = body;

    if (!email || !password || !nickname) {
      return NextResponse.json(
        { message: "이메일, 비밀번호, 닉네임은 필수입니다." },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "이미 사용 중인 이메일입니다." },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nickname,
      },
      select: {
        id: true,
        email: true,
        nickname: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: "회원가입이 완료되었습니다", user },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "회원가입 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
