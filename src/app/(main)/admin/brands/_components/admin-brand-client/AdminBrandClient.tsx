"use client";

import { useState } from "react";
import { AdminBrand } from "../../types/adminBrand";
import AdminBrandHeader from "../admin-brand-header/AdminBrandHeader";
import AdminBrandList from "../admin-brand-list/AdminBrandList";
import CreateBrandModal from "../create-brand-modal/CreateBrandModal";

export default function AdminBrandClient({
  brands,
}: {
  brands: AdminBrand[];
}) {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  return (
    <>
      <AdminBrandHeader onCreateBrandClick={() => setIsBrandModalOpen(true)} />
      <AdminBrandList brands={brands} />
      <CreateBrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />
    </>
  );
}
