export default function ModalFooter({ onClose }: { onClose: () => void }) {
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

