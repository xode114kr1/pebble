"use client";

import { X } from "lucide-react";
import { useState } from "react";

type CreateColorModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateColorModal({
  isOpen,
  onClose,
}: CreateColorModalProps) {
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

