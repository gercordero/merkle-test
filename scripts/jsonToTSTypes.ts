/* eslint-disable @typescript-eslint/naming-convention */
// Node utils
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
// Quicktype
import {
  quicktype,
  InputData,
  jsonInputForTargetLanguage,
  SerializedRenderResult,
} from "quicktype-core";

// Constants
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const endpointBaseUrl = "https://hacker-news.firebaseio.com/v0";

// Create file if it doesn't already exist
const upsertFile = async (filePath: string): Promise<void> => {
  try {
    // try to read file
    await fs.promises.readFile(filePath);
  } catch (error) {
    // create empty file, because it wasn't found
    await fs.promises.writeFile(filePath, "");
  }
};

type Endpoints = Array<{ name: string; url: string }>;
type EndpointsData = Array<{ name: string; data: any } | null>;

// Fetch endpoints data so we can use it to generate types based on it
const fetchEndpointsData = async (
  endpoints: Endpoints,
): Promise<EndpointsData> =>
  await Promise.all(
    endpoints.map(async ({ name, url }) => {
      try {
        const response = await fetch(url);
        let data = await response.json();

        // Quicktype doesn't convert arrays to interfaces.
        // To solve that we just place the array inside an object.
        if (Array.isArray(data)) {
          data = { [name]: data };
        }

        return { name, data };
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return null;
      }
    }),
  );

// Transform api json responses to typescript types
const quicktypeJSON = async (
  targetLanguage: string,
  jsonDataToTransform: EndpointsData,
): Promise<SerializedRenderResult> => {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  for (const element of jsonDataToTransform) {
    const { name, data } = element ?? {};

    await jsonInput.addSource({
      name: name ?? "",
      samples: [JSON.stringify(data)],
    });
  }

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: targetLanguage,
    rendererOptions: { "just-types": "true" },
  });
};

const main = async (): Promise<void> => {
  const targetFilePath = path.resolve(
    __dirname,
    "../src/types/HackerAPITypes.ts",
  );
  const endpoints = [
    { name: "TopStories", url: `${endpointBaseUrl}/topstories.json` },
    { name: "Item", url: `${endpointBaseUrl}/item/32817466.json` },
    { name: "User", url: `${endpointBaseUrl}/user/lame-robot-hoax.json` },
  ];
  const transformTargetLanguage = "TypeScript";

  const jsonDataToTransform = await fetchEndpointsData(endpoints);

  await upsertFile(targetFilePath);

  const data = await quicktypeJSON(
    transformTargetLanguage,
    jsonDataToTransform,
  );

  // Write transformed data to file
  await fs.promises.writeFile(targetFilePath, data.lines.join("\n"));
};

void main();
