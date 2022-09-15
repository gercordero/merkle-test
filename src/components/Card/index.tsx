import { FC, lazy, Suspense } from "react";
// Types
import { TopStoriesWithAuthors } from "@/services/topstoriesService/topstoriesService";

const Component = lazy(() => import("./Card"));
const Card: FC<TopStoriesWithAuthors> = (props): JSX.Element => {
  return (
    // TODO: Replace fallback with a nice placeholder
    <Suspense fallback={<h3>Loading...</h3>}>
      <Component {...props} />
    </Suspense>
  );
};

export default Card;
