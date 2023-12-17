import { axiosInstance } from ".";
import { UserResponse } from "./types";

export const peopleApi = {
  search: async (query: string) => {
    const response = await axiosInstance.post<UserResponse[]>(
      "/people/search",
      {
        query,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
};
