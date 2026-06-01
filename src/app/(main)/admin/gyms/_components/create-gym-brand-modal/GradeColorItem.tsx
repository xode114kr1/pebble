import { ChevronDown, ChevronUp, X } from "lucide-react";
import { GradeColor } from "./types";

type GradeColorItemProps = {
  gradeColor: GradeColor;
  index: number;
  isFirst: boolean;
  isLast: boolean;
};

export default function GradeColorItem({
  gradeColor,
  index,
  isFirst,
  isLast,
}: GradeColorItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-outline-variant bg-background px-3 py-2 shadow-sm">
      <span className="w-6 text-center font-label text-label-sm text-on-surface-variant">
        {index + 1}
      </span>

      <div
        className="h-5 w-5 rounded-full border border-outline-variant"
        style={{ backgroundColor: gradeColor.color }}
      />

      <span className="flex-1 font-label text-label-md text-on-surface">
        {gradeColor.name}
      </span>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={isFirst}
          className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-30"
          aria-label={`${gradeColor.name} 위로 이동`}
        >
          <ChevronUp size={16} />
        </button>

        <button
          type="button"
          disabled={isLast}
          className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-30"
          aria-label={`${gradeColor.name} 아래로 이동`}
        >
          <ChevronDown size={16} />
        </button>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
          aria-label={`${gradeColor.name} 삭제`}
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}

