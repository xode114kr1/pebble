"use client";

import { Palette, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getDifficultyColors } from "./api";
import CreateColorModal from "./CreateColorModal";
import GradeColorItem from "./GradeColorItem";
import GradeColorSearchDropdown from "./GradeColorSearchDropdown";
import { GradeColor } from "./types";

type GradeColorSectionProps = {
  selectedColors: GradeColor[];
  onSelectedColorsChange: (selectedColors: GradeColor[]) => void;
};

export default function GradeColorSection({
  selectedColors,
  onSelectedColorsChange,
}: GradeColorSectionProps) {
  const [isCreateColorModalOpen, setIsCreateColorModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<GradeColor[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchKeywordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const keyword = event.target.value;
    const hasKeyword = Boolean(keyword.trim());

    setSearchKeyword(keyword);
    setIsDropdownOpen(hasKeyword);

    if (!hasKeyword) {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (color: GradeColor) => {
    const isAlreadySelected = selectedColors.some(
      (selectedColor) => selectedColor.id === color.id,
    );

    if (!isAlreadySelected) {
      onSelectedColorsChange([...selectedColors, color]);
    }

    setSearchKeyword("");
    setSearchResults([]);
    setIsSearching(false);
    setIsDropdownOpen(false);
  };

  const handleMoveSelectedColor = (fromIndex: number, toIndex: number) => {
    const nextSelectedColors = [...selectedColors];
    const [targetColor] = nextSelectedColors.splice(fromIndex, 1);

    nextSelectedColors.splice(toIndex, 0, targetColor);
    onSelectedColorsChange(nextSelectedColors);
  };

  const handleRemoveSelectedColor = (id: string) => {
    onSelectedColorsChange(
      selectedColors.filter((selectedColor) => selectedColor.id !== id),
    );
  };

  useEffect(() => {
    const keyword = searchKeyword.trim();

    if (!keyword) {
      return;
    }

    let isCanceled = false;

    const fetchDifficultyColors = async () => {
      setIsSearching(true);

      try {
        const difficultyColors = await getDifficultyColors(keyword);

        if (isCanceled) {
          return;
        }

        setSearchResults(
          difficultyColors.map((color) => ({
            id: String(color.id),
            name: color.name,
            color: color.colorCode,
          })),
        );
        setIsDropdownOpen(true);
      } catch {
        if (!isCanceled) {
          setSearchResults([]);
          setIsDropdownOpen(false);
        }
      } finally {
        if (!isCanceled) {
          setIsSearching(false);
        }
      }
    };

    fetchDifficultyColors();

    return () => {
      isCanceled = true;
    };
  }, [searchKeyword]);

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
            onChange={handleSearchKeywordChange}
            placeholder="저장된 색상 검색"
            className="w-full rounded-lg border border-outline-variant bg-background py-3 pl-11 pr-4 font-label text-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          {isDropdownOpen && (
            <GradeColorSearchDropdown
              colors={searchResults}
              isLoading={isSearching}
              keyword={searchKeyword}
              onSelect={handleSelectSearchResult}
            />
          )}
        </div>
      </div>

      <div className="space-y-2 rounded-xl border border-outline-variant/50 bg-surface-container p-4">
        {selectedColors.length > 0 ? (
          selectedColors.map((gradeColor, index) => (
            <GradeColorItem
              key={gradeColor.id}
              gradeColor={gradeColor}
              index={index}
              isFirst={index === 0}
              isLast={index === selectedColors.length - 1}
              onMoveUp={() => handleMoveSelectedColor(index, index - 1)}
              onMoveDown={() => handleMoveSelectedColor(index, index + 1)}
              onRemove={() => handleRemoveSelectedColor(gradeColor.id)}
            />
          ))
        ) : (
          <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-outline-variant bg-background px-4 py-6">
            <p className="text-center text-body-sm text-on-surface-variant">
              검색으로 브랜드에 적용할 색상을 추가해주세요.
            </p>
          </div>
        )}
      </div>

      <CreateColorModal
        isOpen={isCreateColorModalOpen}
        onClose={() => setIsCreateColorModalOpen(false)}
      />
    </section>
  );
}
