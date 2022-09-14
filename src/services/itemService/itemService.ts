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
): Promise<Array<AxiosResponse<Item> | null>> =>
  await Promise.all(ids.map(async id => await getItem(id, options)));

export const getSortedItemsByScore = async (
  ids: Array<Item["id"]>,
  options?: AxiosRequestConfig,
): Promise<Array<Item | null>> => {
  const response = await getItems(ids, options);

  // Get items out of response
  const items = response.map(item => item?.data ?? null);

  // Sort items in ascending order and return
  return items?.sort((a, b) => (a?.score ?? 0) - (b?.score ?? 0));
};
