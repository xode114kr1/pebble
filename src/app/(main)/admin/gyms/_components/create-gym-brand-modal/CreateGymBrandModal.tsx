"use client";

import {
  Building2,
  ChevronDown,
  ChevronUp,
  Palette,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

type GradeColor = {
  id: string;
  name: string;
  color: string;
};

type CreateGymBrandModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const previewGradeColors: GradeColor[] = [
  { id: "white", name: "White", color: "#ffffff" },
  { id: "yellow", name: "Yellow", color: "#facc15" },
  { id: "green", name: "Green", color: "#22c55e" },
  { id: "blue", name: "Blue", color: "#2563eb" },
  { id: "red", name: "Red", color: "#dc2626" },
  { id: "black", name: "Black", color: "#111827" },
];

const savedGradeColors: GradeColor[] = [
  { id: "pink", name: "Pink", color: "#f472b6" },
  { id: "orange", name: "Orange", color: "#f97316" },
  { id: "purple", name: "Purple", color: "#7e22ce" },
  { id: "sky", name: "Sky", color: "#38bdf8" },
];

export default function CreateGymBrandModal({
  isOpen,
  onClose,
}: CreateGymBrandModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 px-4 py-6 backdrop-blur-sm">
      <div className="flex max-h-[88vh] w-[min(calc(100vw-32px),560px)] flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-2xl">
        <ModalHeader onClose={onClose} />

        <div className="space-y-6 overflow-y-auto px-6 py-6 sm:px-8">
          <BrandNameSection />
          <GradeColorSection />
        </div>

        <ModalFooter onClose={onClose} />
      </div>
    </div>
  );
}

function ModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="border-b border-outline-variant px-6 py-5 sm:px-8 sm:py-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-headline-md text-on-surface">
            암장 브랜드 등록
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
          aria-label="모달 닫기"
        >
          <X size={22} />
        </button>
      </div>
    </div>
  );
}

function BrandNameSection() {
  return (
    <section className="space-y-3">
      <label
        htmlFor="gym-brand-name"
        className="block font-label text-label-md text-on-surface-variant"
      >
        브랜드 이름
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 flex -translate-y-1/2 text-outline">
          <Building2 size={18} />
        </span>

        <input
          id="gym-brand-name"
          type="text"
          placeholder="예: 더클라임"
          className="w-full rounded-lg border border-outline-variant bg-background py-3 pl-11 pr-4 font-label text-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </section>
  );
}

function GradeColorSection() {
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

function SavedColorSearch() {
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

function CreateColorModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [colorCode, setColorCode] = useState("#4d5180");

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-inverse-surface/70 px-4 py-6 backdrop-blur-sm">
      <div className="flex w-[min(calc(100vw-32px),420px)] flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-2xl">
        <div className="border-b border-outline-variant px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-headline text-headline-sm text-on-surface">
              색상 코드 등록
            </h3>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
              aria-label="색상 등록 모달 닫기"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="space-y-5 px-6 py-6">
          <section className="space-y-3">
            <label
              htmlFor="new-grade-color-name"
              className="block font-label text-label-md text-on-surface-variant"
            >
              색상 이름
            </label>

            <input
              id="new-grade-color-name"
              type="text"
              placeholder="예: Mint, V3, 노랑"
              className="w-full rounded-lg border border-outline-variant bg-background px-4 py-3 font-label text-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </section>

          <section className="space-y-3">
            <label
              htmlFor="new-grade-color-code"
              className="block font-label text-label-md text-on-surface-variant"
            >
              색상 코드
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-outline-variant bg-background px-4 py-3">
              <input
                id="new-grade-color-code"
                type="color"
                value={colorCode}
                onChange={(event) => setColorCode(event.target.value)}
                className="h-9 w-9 cursor-pointer overflow-hidden rounded-full border border-outline-variant bg-transparent p-0"
                aria-label="색상 코드 선택"
              />
              <input
                type="text"
                value={colorCode.toUpperCase()}
                onChange={(event) => setColorCode(event.target.value)}
                className="min-w-0 flex-1 bg-transparent font-label text-body-md text-on-surface outline-none"
                aria-label="색상 코드 입력"
              />
            </div>
          </section>
        </div>

        <div className="flex justify-end gap-3 border-t border-outline-variant bg-surface-container-low px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-5 py-2.5 font-label text-label-md font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
          >
            취소
          </button>

          <button
            type="button"
            className="rounded-lg bg-primary px-6 py-2.5 font-label text-label-md font-medium text-on-primary shadow-md shadow-primary/20 transition-all hover:opacity-90"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

function GradeColorItem({
  gradeColor,
  index,
  isFirst,
  isLast,
}: {
  gradeColor: GradeColor;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}) {
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

function ModalFooter({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex justify-end gap-3 border-t border-outline-variant bg-surface-container-low px-6 py-5 sm:px-8 sm:py-6">
      <button
        type="button"
        onClick={onClose}
        className="rounded-lg px-6 py-2.5 font-label text-label-md font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
      >
        취소
      </button>

      <button
        type="button"
        className="rounded-lg bg-primary px-8 py-2.5 font-label text-label-md font-medium text-on-primary shadow-md shadow-primary/20 transition-all hover:opacity-90"
      >
        등록하기
      </button>
    </div>
  );
}
