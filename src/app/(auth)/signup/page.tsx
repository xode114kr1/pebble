import { Mountain } from "lucide-react";
import Link from "next/link";
import SignupForm from "./_components/SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-page px-gutter py-2xl">
      <section className="w-full max-w-105">
        <Link
          href="/"
          className="mb-xl flex items-center justify-center gap-sm text-on-surface transition-opacity hover:opacity-80"
          aria-label="Pebble 홈으로 이동"
        >
          <Mountain size={32} fill="currentColor" />
          <span className="headline-md font-bold">Pebble</span>
        </Link>
        <SignupForm />
      </section>
    </main>
  );
}
