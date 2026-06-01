import { Search } from "lucide-react";
import { savedGradeColors } from "./constants";

export default function SavedColorSearch() {
  return (
    <div className="space-y-3 rounded-xl border border-outline-variant bg-surface-container-low p-4">
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

      <div className="grid gap-2 sm:grid-cols-2">
        {savedGradeColors.map((gradeColor) => (
          <button
            key={gradeColor.id}
            type="button"
            className="flex items-center gap-2 rounded-lg border border-outline-variant bg-background px-3 py-2 text-left transition-colors hover:border-primary hover:bg-surface-container-lowest"
          >
            <span
              className="h-5 w-5 rounded-full border border-outline-variant"
              style={{ backgroundColor: gradeColor.color }}
            />
            <span className="flex-1 font-label text-label-md text-on-surface">
              {gradeColor.name}
            </span>
            <span className="font-label text-label-sm text-on-surface-variant">
              {gradeColor.color.toUpperCase()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

