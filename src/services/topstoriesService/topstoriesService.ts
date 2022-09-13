// Client
import { request } from "@/services/clients/HackerAPIClient";
import { AxiosRequestConfig, AxiosResponse } from "axios";
// Helpers
import getMultipleRandom from "./helpers/getMultipleRandom";
// Types
import { TopStories } from "@/types/HackerAPITypes";
import { isEmpty } from "@/helpers";

export const getTopStories = async (
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<TopStories["TopStories"]> | null> =>
  await request({ url: `/topstories.json`, method: "GET", ...options });

export const getRandomTopStories = async (
  limit: number,
  options?: AxiosRequestConfig,
): Promise<TopStories["TopStories"] | null> => {
  const { data: topStories } = (await getTopStories(options)) ?? {};

  // Make sure that we have results
  if (!topStories || isEmpty(topStories)) {
    return null;
  }

  // Make sure that the limit that we are using isn't ...
  // ... bigger than the actual topStories size
  const maxLimit = Math.min(limit, topStories.length);

  const randomTopStories = getMultipleRandom(topStories, maxLimit);

  return randomTopStories;
};
