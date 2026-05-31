export type GradeColor = {
  id: string;
  name: string;
  color: string;
};

export type GymBrand = {
  id: string;
  name: string;
  gradeColors: GradeColor[];
};

export type GymBranch = {
  id: string;
  brandId: string;
  branchName: string;
  location: string;
  createdAt: string;
};

export type GymBranchWithBrand = GymBranch & {
  brand: GymBrand;
};
