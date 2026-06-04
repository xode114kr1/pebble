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
  const [selectedBrand, setSelectedBrand] = useState<AdminBrand | null>(null);

  const handleCreateBrandClick = () => {
    setSelectedBrand(null);
    setIsBrandModalOpen(true);
  };

  const handleBrandClick = (brand: AdminBrand) => {
    setSelectedBrand(brand);
    setIsBrandModalOpen(true);
  };

  const handleBrandModalClose = () => {
    setIsBrandModalOpen(false);
    setSelectedBrand(null);
  };

  return (
    <>
      <AdminBrandHeader
        query={query}
        onCreateBrandClick={handleCreateBrandClick}
      />
      <AdminBrandList brands={brands} onBrandClick={handleBrandClick} />
      <BrandFormModal
        key={selectedBrand ? `edit-${selectedBrand.id}` : "create"}
        mode={selectedBrand ? "edit" : "create"}
        isOpen={isBrandModalOpen}
        initialBrand={selectedBrand}
        onClose={handleBrandModalClose}
      />
    </>
  );
}
