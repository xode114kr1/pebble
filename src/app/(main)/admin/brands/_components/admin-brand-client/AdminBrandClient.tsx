"use client";

import { useState } from "react";
import { AdminBrand } from "../../types/adminBrand";
import AdminBrandHeader from "../admin-brand-header/AdminBrandHeader";
import AdminBrandList from "../admin-brand-list/AdminBrandList";
import BrandFormModal from "../brand-form-modal/BrandFormModal";

export default function AdminBrandClient({
  brands,
  query,
}: {
  brands: AdminBrand[];
  query: string;
}) {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);

  return (
    <>
      <AdminBrandHeader
        query={query}
        onCreateBrandClick={() => setIsBrandModalOpen(true)}
      />
      <AdminBrandList brands={brands} />
      <BrandFormModal
        mode="create"
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />
    </>
  );
}
