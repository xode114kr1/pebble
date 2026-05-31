"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathName = usePathname();
  const { data: session, status } = useSession();

  const title =
    pathName === "/"
      ? "Home"
      : pathName.charAt(1).toUpperCase() + pathName.slice(2);

  return (
    <header className="sticky top-0 z-40 mx-auto flex h-16 w-full shrink-0 items-center justify-between border-b border-outline-variant bg-surface px-gutter">
      <h1 className="headline-md font-bold text-on-surface">{title}</h1>

      {status === "loading" ? null : session?.user ? (
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="rounded-md border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface"
        >
          로그아웃
        </button>
      ) : (
        <Link
          href="/login"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary"
        >
          로그인
        </Link>
      )}
    </header>
  );
}
