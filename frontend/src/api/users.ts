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
  getUserLastConnection: async (id: string) => {
    const response = await axiosInstance.get<{
      lastConnection?: string | null;
    }>(`/user/${id}/last-connection`);
    return response.data;
  },
  updateUserLastConnection: async (id: string, lastConnection: string) => {
    const response = await axiosInstance.post<{
      lastConnection?: string | null;
    }>(
      `/user/${id}/last-connection`,
      {
        lastConnection,
      },
      { withCredentials: true }
    );
    return response.data;
  },
  emitSSETest: async (userId: string) => {
    const response = await axiosInstance.post(
      "/events/emit",
      {
        userId,
        event: "test",
        data: "test",
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
};
