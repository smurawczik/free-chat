import { axiosInstance } from ".";
import { UserRequest, UserResponse } from "./types";

export const usersApi = {
  createQuickUser: async ({
    firstName,
    lastName,
    email,
    password,
  }: UserRequest) => {
    const response = await axiosInstance.post<UserResponse>("/user", {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  },
  getUser: async () => {
    const response = await axiosInstance.get<UserResponse>("/users/me");
    return response.data;
  },
  findUsersByName: async (name: string) => {
    const response = await axiosInstance.get<UserResponse[]>("/users", {
      params: {
        name,
      },
    });
    return response.data;
  },
};
