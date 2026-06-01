"use client";

import { Building2, Palette, Plus, X } from "lucide-react";

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
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-label text-label-md text-on-surface-variant">
          <Palette size={18} className="text-primary" />
          <label htmlFor="grade-color-name">Grade Color</label>
        </div>

        <span className="shrink-0 rounded-full bg-primary-container/20 px-2 py-0.5 font-label text-label-sm text-primary">
          {previewGradeColors.length}개
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            id="grade-color-name"
            type="text"
            placeholder="색상명 (예: 흰색, V1)"
            className="w-full rounded-lg border border-outline-variant bg-background py-3 pl-4 pr-14 font-label text-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary-container px-4 py-3 font-label text-label-md text-on-primary-container transition-opacity hover:opacity-90 sm:py-0"
        >
          <Plus size={16} />
          <span>추가</span>
        </button>
      </div>

      <div className="flex min-h-20 flex-wrap gap-2.5 rounded-xl border border-outline-variant/50 bg-surface-container p-4">
        {previewGradeColors.map((gradeColor) => (
          <GradeColorChip key={gradeColor.id} gradeColor={gradeColor} />
        ))}
      </div>
    </section>
  );
}

function GradeColorChip({ gradeColor }: { gradeColor: GradeColor }) {
  return (
    <div className="group flex items-center gap-2 rounded-full border border-outline-variant bg-background py-1 pl-1 pr-2 shadow-sm">
      <div
        className="h-5 w-5 rounded-full border border-outline-variant"
        style={{ backgroundColor: gradeColor.color }}
      />

      <span className="font-label text-label-md text-on-surface">
        {gradeColor.name}
      </span>

      <button
        type="button"
        className="ml-1 text-on-surface-variant transition-colors hover:text-error"
        aria-label={`${gradeColor.name} 삭제`}
      >
        <X size={14} />
      </button>
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
