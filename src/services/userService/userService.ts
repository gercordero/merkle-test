// Client
import { request } from "@/services/clients/HackerAPIClient";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { User } from "@/types/HackerAPITypes";

export const getUser = async (
  id: User["id"],
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<User> | null> =>
  await request({ url: `/user/${id}.json`, method: "GET", ...options });

export const getUsers = async (
  ids: Array<User["id"]>,
  options?: AxiosRequestConfig,
): Promise<Array<AxiosResponse<User> | null>> =>
  await Promise.all(ids.map(async id => await getUser(id, options)));
