"use client";

import useOutSideClick from "@/hooks/useOutSideClick";
import { Building2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminBrand } from "../../types/adminBrand";
import { createBrand, updateBrand } from "./api";
import GradeColorSection from "./GradeColorSection";
import { GradeColor } from "./types";

type BrandFormModalMode = "create" | "edit";

type BrandFormModalProps = {
  mode: BrandFormModalMode;
  isOpen: boolean;
  initialBrand?: AdminBrand | null;
  onClose: () => void;
};

export default function BrandFormModal({
  mode,
  isOpen,
  initialBrand,
  onClose,
}: BrandFormModalProps) {
  const router = useRouter();
  const [brandName, setBrandName] = useState(initialBrand?.name ?? "");
  const [selectedColors, setSelectedColors] = useState<GradeColor[]>(
    () =>
      initialBrand?.colors.map((brandColor) => ({
        id: String(brandColor.difficultyColor.id),
        name: brandColor.difficultyColor.name,
        color: brandColor.difficultyColor.colorCode,
      })) ?? [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = () => {
    setBrandName("");
    setSelectedColors([]);
    setErrorMessage("");
    onClose();
  };

  const modalRef = useOutSideClick<HTMLDivElement>(handleClose, isOpen);

  const handleSubmit = async () => {
    const trimmedName = brandName.trim();
    const difficultyColorIds = selectedColors.map((color) => Number(color.id));

    if (!trimmedName) {
      setErrorMessage("브랜드 이름을 입력해주세요.");
      return;
    }

    if (selectedColors.length === 0) {
      setErrorMessage("브랜드에 적용할 난이도 색상을 선택해주세요.");
      return;
    }

    const hasInvalidDifficultyColorId = difficultyColorIds.some(
      (difficultyColorId) =>
        !Number.isInteger(difficultyColorId) || difficultyColorId <= 0,
    );

    if (hasInvalidDifficultyColorId) {
      setErrorMessage("올바른 난이도 색상을 선택해주세요.");
      return;
    }

    if (mode === "edit" && !initialBrand) {
      setErrorMessage("수정할 브랜드를 선택해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      if (mode === "edit" && initialBrand) {
        await updateBrand(initialBrand.id, {
          name: trimmedName,
          difficultyColorIds,
        });
      } else {
        await createBrand({
          name: trimmedName,
          difficultyColorIds,
        });
      }

      router.refresh();
      handleClose();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : `브랜드 ${mode === "create" ? "등록" : "수정"} 중 오류가 발생했습니다.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 px-4 py-6 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="flex max-h-[88vh] w-[min(calc(100vw-32px),560px)] flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-2xl"
      >
        <ModalHeader mode={mode} onClose={handleClose} />

        <div className="space-y-6 overflow-y-auto px-6 py-6 sm:px-8">
          <BrandNameSection
            brandName={brandName}
            onBrandNameChange={(nextBrandName) => {
              setBrandName(nextBrandName);
              setErrorMessage("");
            }}
          />
          <GradeColorSection
            selectedColors={selectedColors}
            onSelectedColorsChange={(nextSelectedColors) => {
              setSelectedColors(nextSelectedColors);
              setErrorMessage("");
            }}
          />

          {errorMessage && (
            <p className="text-body-sm text-error">{errorMessage}</p>
          )}
        </div>

        <ModalFooter
          mode={mode}
          isSubmitting={isSubmitting}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

type ModalHeaderProps = {
  mode: BrandFormModalMode;
  onClose: () => void;
};

function ModalHeader({ mode, onClose }: ModalHeaderProps) {
  const title = mode === "create" ? "암장 브랜드 등록" : "암장 브랜드 수정";

  return (
    <div className="border-b border-outline-variant px-6 py-5 sm:px-8 sm:py-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-headline-md text-on-surface">
            {title}
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

type BrandNameSectionProps = {
  brandName: string;
  onBrandNameChange: (brandName: string) => void;
};

function BrandNameSection({
  brandName,
  onBrandNameChange,
}: BrandNameSectionProps) {
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
          value={brandName}
          onChange={(event) => onBrandNameChange(event.target.value)}
          placeholder="예: 더클라임"
          className="w-full rounded-lg border border-outline-variant bg-background py-3 pl-11 pr-4 font-label text-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </section>
  );
}

type ModalFooterProps = {
  mode: BrandFormModalMode;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

function ModalFooter({
  mode,
  isSubmitting,
  onClose,
  onSubmit,
}: ModalFooterProps) {
  const submitLabel = mode === "create" ? "등록하기" : "수정하기";
  const submittingLabel = mode === "create" ? "등록 중" : "수정 중";

  return (
    <div className="flex justify-end gap-3 border-t border-outline-variant bg-surface-container-low px-6 py-5 sm:px-8 sm:py-6">
      <button
        type="button"
        onClick={onClose}
        disabled={isSubmitting}
        className="rounded-lg px-6 py-2.5 font-label text-label-md font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-60"
      >
        취소
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="rounded-lg bg-primary px-8 py-2.5 font-label text-label-md font-medium text-on-primary shadow-md shadow-primary/20 transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? submittingLabel : submitLabel}
      </button>
    </div>
  );
}
