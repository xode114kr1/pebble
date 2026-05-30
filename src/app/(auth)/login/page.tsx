import { Mountain } from "lucide-react";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-page px-gutter py-2xl">
      <section className="w-full max-w-105">
        <div className="mb-xl flex items-center justify-center gap-sm text-on-surface">
          <Mountain size={32} fill="currentColor" />
          <span className="headline-md font-bold">Pebble</span>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
