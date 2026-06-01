"use client";

import { Palette, Plus } from "lucide-react";
import { useState } from "react";
import { previewGradeColors } from "./constants";
import CreateColorModal from "./CreateColorModal";
import GradeColorItem from "./GradeColorItem";
import SavedColorSearch from "./SavedColorSearch";

export default function GradeColorSection() {
  const [isCreateColorModalOpen, setIsCreateColorModalOpen] = useState(false);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-label text-label-md text-on-surface-variant">
          <Palette size={18} className="text-primary" />
          <span>Grade Color</span>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateColorModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg border border-primary px-3 py-2 font-label text-label-sm text-primary transition-colors hover:bg-surface-container-low"
        >
          <Plus size={15} />
          <span>색상 추가</span>
        </button>
      </div>

      <SavedColorSearch />

      <div className="space-y-2 rounded-xl border border-outline-variant/50 bg-surface-container p-4">
        {previewGradeColors.map((gradeColor, index) => (
          <GradeColorItem
            key={gradeColor.id}
            gradeColor={gradeColor}
            index={index}
            isFirst={index === 0}
            isLast={index === previewGradeColors.length - 1}
          />
        ))}
      </div>

      <CreateColorModal
        isOpen={isCreateColorModalOpen}
        onClose={() => setIsCreateColorModalOpen(false)}
      />
    </section>
  );
}

