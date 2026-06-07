export type SignupUserRequest = {
  email: string;
  nickname: string;
  password: string;
};

export type SignupUserResponse = {
  message: string;
  user: {
    id: string;
    email: string;
    nickname: string;
    createdAt: string;
  };
};

export async function signupUser({
  email,
  nickname,
  password,
}: SignupUserRequest): Promise<SignupUserResponse> {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      nickname,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "회원가입에 실패했습니다.");
  }

  return data;
}
