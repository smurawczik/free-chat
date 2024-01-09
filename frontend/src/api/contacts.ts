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
  acceptContact: async (contactId: string) => {
    const response = await axiosInstance.post<ContactResponse>(
      "/contact/accept",
      { contactId },
      { withCredentials: true }
    );
    return response.data;
  },
  rejectContact: async (contactId: string) => {
    const response = await axiosInstance.post<ContactResponse>(
      "/contact/reject",
      { contactId },
      { withCredentials: true }
    );
    return response.data;
  },
  acceptContactEvent: async (contactId: string) => {
    const response = await axiosInstance.post<{
      contactId: string;
    }>(
      "/events/contact-accepted-event",
      {
        contactId,
        accepted: true,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
  rejectContactEvent: async (contactId: string) => {
    const response = await axiosInstance.post<{
      contactId: string;
    }>(
      "/events/contact-accepted-event",
      {
        contactId,
        accepted: false,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
};
