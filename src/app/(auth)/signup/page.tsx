import { Mountain } from "lucide-react";
import SignupForm from "./_components/SignupForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-page px-gutter py-2xl">
      <section className="w-full max-w-105">
        <div className="mb-xl flex items-center justify-center gap-sm text-on-surface">
          <Mountain size={32} fill="currentColor" />
          <span className="headline-md font-bold">Pebble</span>
        </div>
        <SignupForm />
      </section>
    </main>
  );
}
