// Pages
import Home from "@/pages/Home";
// Components
import Layout from "@/components/Layout/Layout";
// Styles
import "@/styles/main.scss";

const App = (): JSX.Element => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default App;
