import { axiosInstance } from ".";
import { UserResponse } from "./types";

export const usersApi = {
  createQuickUser: async ({
    firstName,
    lastName,
    email,
  }: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    const response = await axiosInstance.post<UserResponse>("/user", {
      firstName,
      lastName,
      email,
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
