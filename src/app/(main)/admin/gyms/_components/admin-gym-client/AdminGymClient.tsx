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

  return (
    <>
      <AdminGymHeader
        query={query}
        onCreateGymClick={() => setIsGymModalOpen(true)}
      />
      <AdminGymList gymlist={gymlist} />
      {isGymModalOpen ? (
        <GymDetailModal
          brands={brands}
          isOpen={isGymModalOpen}
          onClose={() => setIsGymModalOpen(false)}
          onCreated={() => {
            setIsGymModalOpen(false);
            router.refresh();
          }}
        />
      ) : null}
    </>
  );
}
