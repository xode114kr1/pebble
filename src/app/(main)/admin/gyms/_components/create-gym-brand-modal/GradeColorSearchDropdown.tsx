import { Plus } from "lucide-react";
import { GradeColor } from "./types";

type GradeColorSearchDropdownProps = {
  colors: GradeColor[];
  isLoading: boolean;
  keyword: string;
  onSelect: (color: GradeColor) => void;
};

export default function GradeColorSearchDropdown({
  colors,
  isLoading,
  keyword,
  onSelect,
}: GradeColorSearchDropdownProps) {
  return (
    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-10 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-2xl">
      <div className="max-h-56 overflow-y-auto p-2">
        {isLoading ? (
          <p className="px-3 py-2.5 text-body-sm text-on-surface-variant">
            검색 중입니다.
          </p>
        ) : colors.length > 0 ? (
          colors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => onSelect(color)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface-container-low"
            >
              <span
                className="h-6 w-6 shrink-0 rounded-full border border-outline-variant"
                style={{ backgroundColor: color.color }}
              />

              <span className="min-w-0 flex-1">
                <span className="block font-label text-label-md text-on-surface">
                  {color.name}
                </span>
                <span className="block font-label text-label-sm text-on-surface-variant">
                  {color.color.toUpperCase()}
                </span>
              </span>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-primary">
                <Plus size={16} />
              </span>
            </button>
          ))
        ) : (
          <p className="px-3 py-2.5 text-body-sm text-on-surface-variant">
            &quot;{keyword}&quot;에 해당하는 색상이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
