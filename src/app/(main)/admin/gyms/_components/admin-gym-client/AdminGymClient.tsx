"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GymBranchListItem, GymBrandSummary } from "@/types/gym";
import AdminGymHeader from "../admin-gym-header/AdminGymHeader";
import AdminGymList from "../admin-gym-list/AdminGymList";
import GymFormModal from "../gym-form-modal/GymFormModal";

export default function AdminGymClient({
  brands,
  gymlist,
  query,
}: {
  brands: GymBrandSummary[];
  gymlist: GymBranchListItem[];
  query: string;
}) {
  const router = useRouter();
  const [isGymModalOpen, setIsGymModalOpen] = useState(false);
  const [selectedGymBranch, setSelectedGymBranch] =
    useState<GymBranchListItem | null>(null);

  const handleCreateGymClick = () => {
    setSelectedGymBranch(null);
    setIsGymModalOpen(true);
  };

  const handleGymClick = (gymBranch: GymBranchListItem) => {
    setSelectedGymBranch(gymBranch);
    setIsGymModalOpen(true);
  };

  const handleGymModalClose = () => {
    setIsGymModalOpen(false);
    setSelectedGymBranch(null);
  };

  return (
    <>
      <AdminGymHeader
        query={query}
        onCreateGymClick={handleCreateGymClick}
      />
      <AdminGymList
        gymlist={gymlist}
        query={query}
        onGymClick={handleGymClick}
      />
      {isGymModalOpen ? (
        <GymFormModal
          key={selectedGymBranch ? `edit-${selectedGymBranch.id}` : "create"}
          mode={selectedGymBranch ? "edit" : "create"}
          brands={brands}
          isOpen={isGymModalOpen}
          initialData={selectedGymBranch}
          onClose={handleGymModalClose}
          onCreated={() => {
            setIsGymModalOpen(false);
            setSelectedGymBranch(null);
            router.refresh();
          }}
        />
      ) : null}
    </>
  );
}
