export type GradeColor = {
  id: string;
  name: string;
  color: string;
};

export type GymBrandSummary = {
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

export type GymBranchListItem = GymBranch & {
  brand: GymBrandSummary;
};
