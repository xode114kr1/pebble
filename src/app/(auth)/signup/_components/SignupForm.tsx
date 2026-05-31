"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignupForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email"));
    const nickname = String(formData.get("nickname"));
    const password = String(formData.get("password"));
    const passwordConfirm = String(formData.get("passwordConfirm"));

    if (!email || !nickname || !password || !passwordConfirm) {
      setErrorMessage("모든 항목을 입력해주세요");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("비밀번호는 8자 이상 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          nickname,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "회원가입에 실패했습니다.");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMessage("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="mb-xl space-y-xs text-center">
        <h1 className="headline-md text-on-surface">회원가입</h1>
        <p className="body-sm text-on-surface-variant">
          클라이밍 기록을 시작할 계정을 만들어보세요.
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
          <span className="label-md text-on-surface">닉네임</span>
          <input
            className="input"
            type="text"
            name="nickname"
            placeholder="사용할 닉네임"
            autoComplete="nickname"
          />
        </label>

        <label className="block space-y-xs">
          <span className="label-md text-on-surface">비밀번호</span>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="8자 이상 입력"
            autoComplete="new-password"
          />
        </label>

        <label className="block space-y-xs">
          <span className="label-md text-on-surface">비밀번호 확인</span>
          <input
            className="input"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 다시 입력"
            autoComplete="new-password"
          />
        </label>

        {errorMessage && <p className="body-sm text-error">{errorMessage}</p>}

        <button
          className="btn-primary mt-sm w-full disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>
      </form>

      <p className="body-sm mt-lg text-center text-on-surface-variant">
        이미 계정이 있으신가요?
        <Link className="label-md text-primary" href="/login">
          로그인
        </Link>
      </p>
    </div>
  );
}
