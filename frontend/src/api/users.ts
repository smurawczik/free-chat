import { axiosInstance } from ".";
import { UserRequest, UserResponse } from "./types";

export const usersApi = {
  createQuickUser: async ({
    firstName,
    lastName,
    email,
    password,
  }: UserRequest) => {
    const response = await axiosInstance.post<UserResponse>(
      "/user",
      {
        firstName,
        lastName,
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  },
  getUser: async () => {
    const response = await axiosInstance.get<UserResponse>("/user/me", {
      withCredentials: true,
    });
    return response.data;
  },
};
