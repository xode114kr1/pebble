export type AdminBrandColor = {
  id: number;
  order: number;
  difficultyColor: {
    id: number;
    name: string;
    colorCode: string;
  };
};

export type AdminBrand = {
  id: number;
  name: string;
  colors: AdminBrandColor[];
  createdAt: string;
  updatedAt: string;
};
