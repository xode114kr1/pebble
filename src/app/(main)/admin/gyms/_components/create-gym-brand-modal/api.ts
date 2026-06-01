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
