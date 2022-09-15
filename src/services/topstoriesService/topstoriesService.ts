// Client
import { request } from "@/services/clients/HackerAPIClient";
import { AxiosRequestConfig, AxiosResponse } from "axios";
// Helpers
import { isEmpty } from "@/helpers";
import {
  getMultipleRandom,
  getRandomImages,
} from "@/services/topstoriesService/helpers";
// Types
import { Item, TopStories, User } from "@/types/HackerAPITypes";
// Services
import { getSortedItemsByScore } from "@/services/itemService/itemService";
import { getUsers } from "@/services/userService/userService";

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

export interface TopStoriesWithAuthors extends Item {
  author?: User;
  image: string;
}

export const getRandomTopStoriesWithAuthors = async (
  limit: number,
  options?: AxiosRequestConfig,
): Promise<TopStoriesWithAuthors[]> => {
  // Get random top stories using the limit param
  const randomTopStories = (await getRandomTopStories(limit, options)) ?? [];
  // Get storyItems sorted in ascending order
  const storyItems = await getSortedItemsByScore(randomTopStories, options);
  // Get author id from each story item
  const authorsIds = storyItems.map(item => item?.by ?? "");
  // Get a list of author details
  const usersResponse = await getUsers(authorsIds, options);
  // We are just interested in the data here, not the entire response.
  const authors = usersResponse.map(user => user?.data);
  // Get random images
  const randomizedImages = getRandomImages(limit);

  // Attach author details and random image to storyItems
  const storyItemsWithAuthors = storyItems.map((item, index) => ({
    ...(item as Item),
    author: authors.find(author => author?.id === item?.by),
    image: randomizedImages[index],
  }));

  return storyItemsWithAuthors;
};
