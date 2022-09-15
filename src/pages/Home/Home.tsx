// Components
import Card from "@/components/Card";
// Hooks
import useFetchRandomTopStories from "@/pages/Home/hooks/useFetchRandomTopStories";
// Styles
import "./Home.scss";

const Home = (): JSX.Element => {
  const { data: topStories, status } = useFetchRandomTopStories();

  if (status === "loading") {
    // TODO: Replace loading fallback with a nice spinner
    return (
      <section className="home">
        <h4>Loading...</h4>
      </section>
    );
  }

  return (
    <section className="home">
      {topStories?.map(story => (
        <Card {...story} key={story?.id} />
      ))}
    </section>
  );
};

export default Home;
