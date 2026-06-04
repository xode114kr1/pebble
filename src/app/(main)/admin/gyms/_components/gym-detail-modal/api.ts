export type CreateGymBranchRequest = {
  brandId: number;
  name: string;
  location: string;
};

export async function createGymBranch({
  brandId,
  name,
  location,
}: CreateGymBranchRequest) {
  const response = await fetch("/api/gym-branches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      brandId,
      name,
      location,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "암장 지점 등록에 실패하였습니다");
  }

  return data;
}
