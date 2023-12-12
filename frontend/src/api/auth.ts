import { axiosInstance } from ".";
import { LoginRequest, UserResponse } from "./types";

export const authApi = {
  login: async ({ email, password }: LoginRequest) => {
    const response = await axiosInstance.post<UserResponse>(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  },
};
