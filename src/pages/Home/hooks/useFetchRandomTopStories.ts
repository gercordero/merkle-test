// React
import { useEffect } from "react";
// Hooks
import { useFetchReducer } from "@/hooks";
// Services
import {
  getRandomTopStoriesWithAuthors,
  TopStoriesWithAuthors,
} from "@/services/topstoriesService/topstoriesService";
// Types
import type { FetchReducerState } from "@/hooks/useFetchReducer/useFetchReducer";

const useFetchRandomTopStories = (): FetchReducerState<
  TopStoriesWithAuthors[]
> => {
  const [state, dispatch] = useFetchReducer<TopStoriesWithAuthors[]>([]);

  useEffect(() => {
    // Instantiate request abort controller
    const controller = new AbortController();

    const fetchRandomTopStories = async (): Promise<void> => {
      dispatch({ type: "loading" });
      try {
        const data = await getRandomTopStoriesWithAuthors(10, {
          signal: controller.signal,
        });

        dispatch({ type: "success", payload: data });
      } catch (error) {
        dispatch({ type: "error", payload: error as Error });
      }
    };

    void fetchRandomTopStories();

    return () => {
      // Abort request if component is unmounted
      controller.abort();
    };
  }, [dispatch]);

  return state;
};

export default useFetchRandomTopStories;
