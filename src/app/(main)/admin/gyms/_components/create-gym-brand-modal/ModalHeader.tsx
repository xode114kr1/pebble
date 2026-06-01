import { X } from "lucide-react";

export default function ModalHeader({ onClose }: { onClose: () => void }) {
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

