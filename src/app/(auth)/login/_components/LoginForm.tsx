"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginForm() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    if (!email || !password) {
      setErrorMessage("모든 항목을 입력해주세요");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("비밀번호는 8자 이상 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
        return;
      }
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMessage("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="card">
      <div className="mb-xl space-y-xs text-center">
        <h1 className="headline-md text-on-surface">로그인</h1>
        <p className="body-sm text-on-surface-variant">
          클라이밍 기록을 이어서 관리해보세요.
        </p>
      </div>

      <form className="space-y-md" onSubmit={handleSubmit}>
        <label className="block space-y-xs">
          <span className="label-md text-on-surface">이메일</span>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="pebble@example.com"
            autoComplete="email"
          />
        </label>

        <label className="block space-y-xs">
          <span className="label-md text-on-surface">비밀번호</span>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            autoComplete="current-password"
          />
        </label>

        <div className="flex items-center justify-between gap-md">
          <label className="label-md flex items-center gap-xs text-on-surface-variant">
            <input
              className="size-4 accent-primary"
              type="checkbox"
              name="remember"
            />
            로그인 유지
          </label>
        </div>
        {errorMessage && <p className="body-sm text-error">{errorMessage}</p>}

        <button className="btn-primary mt-sm w-full" type="submit">
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <p className="body-sm mt-lg text-center text-on-surface-variant">
        아직 계정이 없으신가요?{" "}
        <Link className="label-md text-primary" href="/signup">
          회원가입
        </Link>
      </p>
    </div>
  );
}
