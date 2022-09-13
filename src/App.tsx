// React
import { useEffect } from "react";
// Hooks
import { useFetchReducer } from "@/hooks";
// Services
import { getRandomTopStories } from "@/services/topstoriesService/topstoriesService";
// Types
import type { TopStories } from "@/types/HackerAPITypes";
import type { FetchReducerState } from "@/hooks/useFetchReducer/useFetchReducer";
// Styles
import "@/styles/main.scss";

type RandomTopStories = TopStories["TopStories"] | null;

const useFetchRandomTopStories = (): FetchReducerState<RandomTopStories> => {
  const [state, dispatch] = useFetchReducer<RandomTopStories>();

  useEffect(() => {
    const fetchRandomTopStories = async (): Promise<void> => {
      dispatch({ type: "loading" });
      try {
        const data = await getRandomTopStories(10);

        dispatch({ type: "success", payload: data });
      } catch (error) {
        dispatch({ type: "error", payload: error as Error });
      }
    };

    void fetchRandomTopStories();
  }, [dispatch]);

  return state;
};

const App = (): JSX.Element => {
  const randomTopStories = useFetchRandomTopStories();

  return <h1>APP</h1>;
};

export default App;
