"use client";

import { Palette, Plus, Search } from "lucide-react";
import { useState } from "react";
import { previewGradeColors, savedGradeColors } from "./constants";
import CreateColorModal from "./CreateColorModal";
import GradeColorItem from "./GradeColorItem";
import GradeColorSearchDropdown from "./GradeColorSearchDropdown";

export default function GradeColorSection() {
  const [isCreateColorModalOpen, setIsCreateColorModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

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

      <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
          />

          <input
            type="text"
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
            placeholder="저장된 색상 검색"
            className="w-full rounded-lg border border-outline-variant bg-background py-3 pl-11 pr-4 font-label text-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          <GradeColorSearchDropdown colors={savedGradeColors} />
        </div>
      </div>

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

