import { axiosInstance } from ".";
import { ContactResponse } from "./types";

export const contactsApi = {
  userContacts: async () => {
    const response = await axiosInstance.get<ContactResponse[]>("/contact", {
      withCredentials: true,
    });
    return response.data;
  },
  addContact: async (contactId: string) => {
    const response = await axiosInstance.post<ContactResponse>(
      "/contact/add",
      { contactId },
      { withCredentials: true }
    );
    return response.data;
  },
};
