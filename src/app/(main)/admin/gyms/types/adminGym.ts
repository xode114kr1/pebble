import { GradeColor } from "@/types/gym";

export type GymBrand = {
  id: number;
  name: string;
  gradeColors: GradeColor[];
};

export type GymBranch = {
  id: number;
  brandId: number;
  branchName: string;
  location: string;
  createdAt: string;
};

export type GymBranchWithBrand = GymBranch & {
  brand: GymBrand;
};
