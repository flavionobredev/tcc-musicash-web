import axios, { AxiosError } from "axios";
import { useAuthStore } from "~/store/auth.store";

type ClientOptions = {
  timeout?: number;
};

const makeClient = (options?: ClientOptions) => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: options?.timeout || 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (import.meta.server) {
    return client;
  }

  client.interceptors.response.use(null, (error) => {
    if (!(error instanceof AxiosError)) return Promise.reject(error);
    if (error.code === "ERR_NETWORK") {
      error.message =
        "Erro de conexão com o servidor. Por favor, tente novamente em instantes.";
      Reflect.set(error, "parsed", true);
    }

    if (error.code === "ECONNABORTED") {
      error.message =
        "Tempo de conexão excedido. Por favor, tente novamente em instantes.";
      Reflect.set(error, "parsed", true);
    }

    return Promise.reject(error);
  });

  client.interceptors.request.use(async (config) => {
    const { getToken } = useAuthStore();
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return client;
};

export const backendHttpClient = makeClient();
