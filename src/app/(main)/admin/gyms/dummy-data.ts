import { GymBranch, GymBrand } from "./types/adminGym";

export const dummyGymBrands: GymBrand[] = [
  {
    id: "brand-1",
    name: "더클라임",
    gradeColors: [
      { id: "white", name: "White", color: "#ffffff" },
      { id: "yellow", name: "Yellow", color: "#facc15" },
      { id: "orange", name: "Orange", color: "#f97316" },
      { id: "green", name: "Green", color: "#22c55e" },
      { id: "blue", name: "Blue", color: "#2563eb" },
      { id: "red", name: "Red", color: "#dc2626" },
      { id: "purple", name: "Purple", color: "#7e22ce" },
      { id: "black", name: "Black", color: "#111827" },
    ],
  },
  {
    id: "brand-2",
    name: "클라이밍파크",
    gradeColors: [
      { id: "pink", name: "Pink", color: "#f472b6" },
      { id: "sky", name: "Sky", color: "#38bdf8" },
      { id: "emerald", name: "Emerald", color: "#10b981" },
      { id: "brown", name: "Brown", color: "#92400e" },
      { id: "gray", name: "Gray", color: "#374151" },
    ],
  },
  {
    id: "brand-3",
    name: "볼더프렌즈",
    gradeColors: [
      { id: "red", name: "Red", color: "#f87171" },
      { id: "blue", name: "Blue", color: "#60a5fa" },
      { id: "yellow", name: "Yellow", color: "#facc15" },
      { id: "indigo", name: "Indigo", color: "#6366f1" },
    ],
  },
];

export const dummyGymBranches: GymBranch[] = [
  {
    id: "branch-1",
    brandId: "brand-1",
    branchName: "강남점",
    location: "서울 강남구 테헤란로",
    createdAt: "2023.10.12",
  },
  {
    id: "branch-2",
    brandId: "brand-2",
    branchName: "성수점",
    location: "서울 성동구 성수이로",
    createdAt: "2023.11.05",
  },
  {
    id: "branch-3",
    brandId: "brand-3",
    branchName: "홍대점",
    location: "서울 마포구 홍익로",
    createdAt: "2024.01.15",
  },
  {
    id: "branch-4",
    brandId: "brand-1",
    branchName: "잠실점",
    location: "서울 송파구 올림픽로",
    createdAt: "2024.02.20",
  },
];
