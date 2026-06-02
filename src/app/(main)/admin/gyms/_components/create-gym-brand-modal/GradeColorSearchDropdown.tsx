import { Plus } from "lucide-react";
import { GradeColor } from "./types";

type GradeColorSearchDropdownProps = {
  colors: GradeColor[];
};

export default function GradeColorSearchDropdown({
  colors,
}: GradeColorSearchDropdownProps) {
  return (
    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-10 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-2xl">
      <div className="max-h-56 overflow-y-auto p-2">
        {colors.map((color) => (
          <button
            key={color.id}
            type="button"
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
        ))}
      </div>
    </div>
  );
}

