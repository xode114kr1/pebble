"use client";

import { GymBranchWithBrand } from "../../types/adminGym";
import AdminGymHeader from "../admin-gym-header/AdminGymHeader";
import AdminGymList from "../admin-gym-list/AdminGymList";
import CreateGymBrandModal from "../create-gym-brand-modal/CreateGymBrandModal";

export default function AdminGymClient({
  gymlist,
}: {
  gymlist: GymBranchWithBrand[];
}) {
  return (
    <>
      <AdminGymHeader />
      <AdminGymList gymlist={gymlist} />
      <CreateGymBrandModal />
    </>
  );
}
