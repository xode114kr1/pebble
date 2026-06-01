"use client";

import { useState } from "react";
import { GymBranchWithBrand } from "../../types/adminGym";
import AdminGymHeader from "../admin-gym-header/AdminGymHeader";
import AdminGymList from "../admin-gym-list/AdminGymList";
import CreateGymBrandModal from "../create-gym-brand-modal/CreateGymBrandModal";
import GymDetailModal from "../gym-detail-modal/GymDetailModal";

export default function AdminGymClient({
  gymlist,
}: {
  gymlist: GymBranchWithBrand[];
}) {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(true);

  return (
    <>
      <AdminGymHeader />
      <AdminGymList gymlist={gymlist} />
      <CreateGymBrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />
      <GymDetailModal />
    </>
  );
}
