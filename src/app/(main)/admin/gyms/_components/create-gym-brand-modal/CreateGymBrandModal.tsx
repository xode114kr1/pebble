import BrandNameSection from "./BrandNameSection";
import GradeColorSection from "./GradeColorSection";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";

type CreateGymBrandModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

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
