import { ChevronDown, MapPin, Search } from "lucide-react";

function FilterButton({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-outline-variant bg-background px-5 py-2.5 text-sm font-medium text-on-surface transition-all hover:bg-surface-container lg:w-auto"
    >
      <Icon size={16} className="shrink-0" />
      <span className="whitespace-nowrap">{children}</span>
      <ChevronDown size={16} className="shrink-0" />
    </button>
  );
}

export default function GymSearchHeader() {
  return (
    <header className="mx-gutter mt-lg flex flex-col gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <label className="relative block w-full lg:w-105">
        <span className="sr-only">암장 검색</span>
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
        />
        <input
          name="query"
          type="search"
          placeholder="암장 이름 또는 지역으로 검색"
          className="w-full rounded-xl border border-outline-variant bg-background py-3 pl-12 pr-4 text-sm font-medium text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary"
        />
      </label>

      <div className="flex w-full lg:w-auto">
        <FilterButton icon={MapPin}>지역: 전체</FilterButton>
      </div>
    </header>
  );
}
