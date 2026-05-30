import Link from "next/link";

export default function LoginForm() {
  return (
    <div className="card">
      <div className="mb-xl space-y-xs text-center">
        <h1 className="headline-md text-on-surface">로그인</h1>
        <p className="body-sm text-on-surface-variant">
          클라이밍 기록을 이어서 관리해보세요.
        </p>
      </div>

      <form className="space-y-md">
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

          <button className="label-md text-primary" type="button">
            비밀번호 찾기
          </button>
        </div>

        <button className="btn-primary mt-sm w-full" type="button">
          로그인
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
