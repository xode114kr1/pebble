"use client";

import { useState } from "react";
import CreateBrandModal from "../../../brands/_components/create-brand-modal/CreateBrandModal";
import { GymBranchWithBrand, GymBrand } from "../../types/adminGym";
import AdminGymHeader from "../admin-gym-header/AdminGymHeader";
import AdminGymList from "../admin-gym-list/AdminGymList";
import GymDetailModal from "../gym-detail-modal/GymDetailModal";

export default function AdminGymClient({
  gymlist,
}: {
  gymlist: GymBranchWithBrand[];
}) {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isGymModalOpen, setIsGymModalOpen] = useState(false);

  const brands = gymlist.reduce<GymBrand[]>((acc, branch) => {
    if (!acc.some((brand) => brand.id === branch.brand.id)) {
      acc.push(branch.brand);
    }

    return acc;
  }, []);

  return (
    <>
      <AdminGymHeader
        onCreateBrandClick={() => setIsBrandModalOpen(true)}
        onCreateGymClick={() => setIsGymModalOpen(true)}
      />
      <AdminGymList gymlist={gymlist} />
      <CreateBrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />
      <GymDetailModal
        brands={brands}
        isOpen={isGymModalOpen}
        onClose={() => setIsGymModalOpen(false)}
      />
    </>
  );
}
