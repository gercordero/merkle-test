// Client
import { request } from "@/services/clients/HackerAPIClient";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Item } from "@/types/HackerAPITypes";

export const getItem = async (
  id: Item["id"],
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<Item> | null> =>
  await request({ url: `/item/${id}.json`, method: "GET", ...options });

export const getItems = async (
  ids: Array<Item["id"]>,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<Item[]> | null> =>
  await Promise.all(ids.map(async id => await getItem(id, options)));
