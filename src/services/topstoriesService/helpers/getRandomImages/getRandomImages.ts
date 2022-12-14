import { getMultipleRandom } from "@/services/topstoriesService/helpers";

const getImageUrl = (name: string): string => {
  return new URL(`/src/assets/images/${name}.png`, import.meta.url).href;
};

const getRandomImages = (limit: number): string[] => {
  const imagesUrls = Array.from({ length: limit }, (el, index) =>
    getImageUrl(`${index + 1}`),
  );

  const randomizedImagesUrls = getMultipleRandom(imagesUrls, limit);

  return randomizedImagesUrls;
};

export default getRandomImages;
