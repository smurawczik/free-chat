import { axiosInstance } from ".";
import { UserState } from "../store/slices/user/user.slice.types";

export const usersApi = {
  getUser: async () => {
    const response = await axiosInstance.get<UserState>("/users/me");
    return response.data;
  },
  findUsersByName: async (name: string) => {
    const response = await axiosInstance.get<UserState[]>("/users", {
      params: {
        name,
      },
    });
    return response.data;
  },
};
