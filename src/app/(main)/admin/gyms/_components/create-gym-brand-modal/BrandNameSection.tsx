import { Building2 } from "lucide-react";

export default function BrandNameSection() {
  return (
    <section className="space-y-3">
      <label
        htmlFor="gym-brand-name"
        className="block font-label text-label-md text-on-surface-variant"
      >
        브랜드 이름
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 flex -translate-y-1/2 text-outline">
          <Building2 size={18} />
        </span>

        <input
          id="gym-brand-name"
          type="text"
          placeholder="예: 더클라임"
          className="w-full rounded-lg border border-outline-variant bg-background py-3 pl-11 pr-4 font-label text-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </section>
  );
}

