export type CreateDifficultyColorRequest = {
  name: string;
  colorCode: string;
};

export type CreateDifficultyColorResponse = {
  id: number;
  name: string;
  colorCode: string;
  createdAt: string;
  updatedAt: string;
};

export async function createDifficultyColor({
  name,
  colorCode,
}: CreateDifficultyColorRequest): Promise<CreateDifficultyColorResponse> {
  const response = await fetch("/api/difficulty-colors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      colorCode,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "색상 추가에 실패하였습니다");
  }

  return data;
}

export type DifficultyColorResponse = {
  id: number;
  name: string;
  colorCode: string;
};

export async function getDifficultyColors(
  query: string,
): Promise<DifficultyColorResponse[]> {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.set("query", query.trim());
  }

  const response = await fetch(`/api/difficulty-colors?${params.toString()}`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "색상 목록 조회에 실패하였습니다");
  }

  return data;
}

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
