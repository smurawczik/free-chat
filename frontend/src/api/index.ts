import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
});

export const axiosChatInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_CHAT_URL as string,
});
