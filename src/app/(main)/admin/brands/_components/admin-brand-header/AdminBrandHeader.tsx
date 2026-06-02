import { Plus, Search } from "lucide-react";

type AdminBrandHeaderProps = {
  query: string;
  onCreateBrandClick: () => void;
};

export default function AdminBrandHeader({
  query,
  onCreateBrandClick,
}: AdminBrandHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <form action="/admin/brands" className="relative w-full lg:w-105">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
        />

        <input
          name="query"
          type="text"
          defaultValue={query}
          placeholder="브랜드명으로 검색"
          className="w-full rounded-xl border border-outline-variant bg-background py-3 pl-12 pr-4 text-sm font-medium text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary"
        />
      </form>

      <button
        type="button"
        onClick={onCreateBrandClick}
        className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition-all hover:opacity-90 lg:w-auto"
      >
        <Plus size={16} className="shrink-0" />
        암장 브랜드 등록
      </button>
    </header>
  );
}
