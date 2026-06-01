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
  const [brandModal, setBrandModal] = useState("false");
  const [gymModal, setGymModal] = useState("false");
  return (
    <>
      <AdminGymHeader />
      <AdminGymList gymlist={gymlist} />
      <CreateGymBrandModal />
      <GymDetailModal />
    </>
  );
}
