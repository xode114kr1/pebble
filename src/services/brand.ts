import { DifficultyColorResponse } from "./difficultyColor";

export type CreateBrandRequest = {
  name: string;
  difficultyColorIds: number[];
};

export type BrandColorResponse = {
  id: number;
  order: number;
  difficultyColor: DifficultyColorResponse;
};

export type CreateBrandResponse = {
  id: number;
  name: string;
  colors: BrandColorResponse[];
  createdAt: string;
  updatedAt: string;
};

export async function createBrand({
  name,
  difficultyColorIds,
}: CreateBrandRequest): Promise<CreateBrandResponse> {
  const response = await fetch("/api/brands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      difficultyColorIds,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "브랜드 등록에 실패하였습니다");
  }

  return data;
}

export type UpdateBrandRequest = CreateBrandRequest;

export type UpdateBrandResponse = CreateBrandResponse;

export async function updateBrand(
  id: number,
  { name, difficultyColorIds }: UpdateBrandRequest,
): Promise<UpdateBrandResponse> {
  const response = await fetch(`/api/brands/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      difficultyColorIds,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "브랜드 수정에 실패하였습니다");
  }

  return data;
}
