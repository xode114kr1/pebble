"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GymBranchWithBrand, GymBrand } from "../../types/adminGym";
import AdminGymHeader from "../admin-gym-header/AdminGymHeader";
import AdminGymList from "../admin-gym-list/AdminGymList";
import GymDetailModal from "../gym-detail-modal/GymDetailModal";

export default function AdminGymClient({
  brands,
  gymlist,
  query,
}: {
  brands: GymBrand[];
  gymlist: GymBranchWithBrand[];
  query: string;
}) {
  const router = useRouter();
  const [isGymModalOpen, setIsGymModalOpen] = useState(false);
  const [selectedGymBranch, setSelectedGymBranch] =
    useState<GymBranchWithBrand | null>(null);

  const handleCreateGymClick = () => {
    setSelectedGymBranch(null);
    setIsGymModalOpen(true);
  };

  const handleGymClick = (gymBranch: GymBranchWithBrand) => {
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
        <GymDetailModal
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
