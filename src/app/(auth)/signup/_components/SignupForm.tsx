import Link from "next/link";

export default function SignupForm() {
  return (
    <div className="card">
      <div className="mb-xl space-y-xs text-center">
        <h1 className="headline-md text-on-surface">회원가입</h1>
        <p className="body-sm text-on-surface-variant">
          클라이밍 기록을 시작할 계정을 만들어보세요.
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

        <button className="btn-primary mt-sm w-full" type="button">
          회원가입
        </button>
      </form>

      <p className="body-sm mt-lg text-center text-on-surface-variant">
        이미 계정이 있으신가요?{" "}
        <Link className="label-md text-primary" href="/login">
          로그인
        </Link>
      </p>
    </div>
  );
}
