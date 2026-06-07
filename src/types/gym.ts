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

export type AdminGymBrandColor = {
  id: number;
  order: number;
  difficultyColor: {
    id: number;
    name: string;
    colorCode: string;
  };
};

export type AdminGymBrand = {
  id: number;
  name: string;
  colors: AdminGymBrandColor[];
  createdAt: string;
  updatedAt: string;
};
