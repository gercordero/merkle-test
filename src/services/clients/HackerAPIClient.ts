// Axios
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
// Helpers
import { logError } from "@/helpers";

const { VITE_HACKER_API } = import.meta.env;

const HackerAPIClient = axios.create({
  baseURL: VITE_HACKER_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const request = (
  options: AxiosRequestConfig,
): Promise<AxiosResponse | null> => {
  // Success handler
  const onSuccess = (response: AxiosResponse): AxiosResponse => response;

  // Error handler
  const onError = (error: AxiosError): Promise<never> | null => {
    if (axios.isCancel(error)) {
      // No need to throw for a canceled request
      // We can signal a canceled request with a null response
      return null;
    }

    logError(error);
    return Promise.reject(error.response);
  };

  return HackerAPIClient(options).then(onSuccess).catch(onError);
};

export default HackerAPIClient;
