import { Search } from "lucide-react";

export default function SavedColorSearch() {
  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
        />

        <input
          type="text"
          placeholder="저장된 색상 검색"
          className="w-full rounded-lg border border-outline-variant bg-background py-3 pl-11 pr-4 font-label text-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
}

