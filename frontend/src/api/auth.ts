import { axiosInstance } from ".";
import { UserRequest, UserResponse } from "./types";

export const authApi = {
  login: async ({
    email,
    password,
  }: Pick<UserRequest, "email" | "password">) => {
    const response = await axiosInstance.post<UserResponse>(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  },
};
