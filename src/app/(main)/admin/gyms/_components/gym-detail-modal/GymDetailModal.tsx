"use client";

import { Building2, MapPin, Palette, X } from "lucide-react";
import { useMemo, useState } from "react";
import { GymBrand } from "../../types/adminGym";

type GymDetailModalProps = {
  brands: GymBrand[];
  isOpen: boolean;
  onClose: () => void;
};

export default function GymDetailModal({
  brands,
  isOpen,
  onClose,
}: GymDetailModalProps) {
  const [selectedBrandId, setSelectedBrandId] = useState(brands[0]?.id ?? "");

  const selectedBrand = useMemo(
    () => brands.find((brand) => brand.id === selectedBrandId),
    [brands, selectedBrandId],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 px-4 py-6 backdrop-blur-sm">
      <div className="flex max-h-[88vh] w-[min(calc(100vw-32px),560px)] flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-2xl">
        <ModalHeader onClose={onClose} />

        <div className="space-y-6 overflow-y-auto px-6 py-6 sm:px-8">
          <BrandSelect
            brands={brands}
            selectedBrandId={selectedBrandId}
            onChange={setSelectedBrandId}
          />

          <TextField
            id="gym-branch-name"
            label="지점명"
            placeholder="예: 강남점"
            icon={<Building2 size={18} />}
          />

          <TextField
            id="gym-location"
            label="장소"
            placeholder="예: 서울 강남구 테헤란로"
            icon={<MapPin size={18} />}
          />

          <GradeColorSection brand={selectedBrand} />
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
            암장 지점 등록
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

function BrandSelect({
  brands,
  selectedBrandId,
  onChange,
}: {
  brands: GymBrand[];
  selectedBrandId: string;
  onChange: (brandId: string) => void;
}) {
  return (
    <section className="space-y-3">
      <label
        htmlFor="gym-brand"
        className="block font-label text-label-md text-on-surface-variant"
      >
        브랜드
      </label>

      <select
        id="gym-brand"
        value={selectedBrandId}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-outline-variant bg-background px-4 py-3 font-label text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>
    </section>
  );
}

function TextField({
  id,
  label,
  placeholder,
  icon,
}: {
  id: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <label
        htmlFor={id}
        className="block font-label text-label-md text-on-surface-variant"
      >
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 flex -translate-y-1/2 text-outline">
          {icon}
        </span>

        <input
          id={id}
          type="text"
          placeholder={placeholder}
          className="w-full rounded-lg border border-outline-variant bg-background py-3 pl-11 pr-4 font-label text-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </section>
  );
}

function GradeColorSection({ brand }: { brand?: GymBrand }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-label text-label-md text-on-surface-variant">
          <Palette size={18} className="text-primary" />
          <span>Grade Color</span>
        </div>

        <span className="shrink-0 rounded-full bg-primary-container/20 px-2 py-0.5 font-label text-label-sm text-primary">
          {brand?.gradeColors.length ?? 0}개
        </span>
      </div>

      <div className="flex min-h-20 flex-wrap gap-2.5 rounded-xl border border-outline-variant/50 bg-surface-container p-4">
        {brand ? (
          brand.gradeColors.map((gradeColor) => (
            <div
              key={gradeColor.id}
              className="flex items-center gap-2 rounded-full border border-outline-variant bg-background py-1 pl-1 pr-3 shadow-sm"
            >
              <span
                className="h-5 w-5 rounded-full border border-outline-variant"
                style={{ backgroundColor: gradeColor.color }}
              />
              <span className="font-label text-label-md text-on-surface">
                {gradeColor.name}
              </span>
            </div>
          ))
        ) : (
          <p className="text-body-sm text-on-surface-variant">
            브랜드를 선택하면 등급 색상이 표시됩니다.
          </p>
        )}
      </div>
    </section>
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
