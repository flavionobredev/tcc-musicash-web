import axios from "axios";

type ClientOptions = {
  timeout?: number;
};

export const makeClient = (options?: ClientOptions) =>
  axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: options?.timeout || 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });
