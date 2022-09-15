import { lazy, Suspense } from "react";

const Component = lazy(() => import("./Home"));
const Home = (): JSX.Element => {
  return (
    // TODO: Replace fallback with a nice placeholder
    <Suspense fallback={<h3>Loading...</h3>}>
      <Component />
    </Suspense>
  );
};

export default Home;
