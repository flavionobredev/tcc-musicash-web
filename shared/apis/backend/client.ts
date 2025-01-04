import axios, { AxiosError } from "axios";

type ClientOptions = {
  timeout?: number;
};

export const makeClient = (options?: ClientOptions) => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: options?.timeout || 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

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

  return client;
};
