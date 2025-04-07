import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Toaster } from "react-hot-toast";
import { AuthHandler } from "./routes/middleware";
import PageRoutes from "./routes";
import { useFetchProfile } from "./hook/useFetchUser";

function App() {
  const isLoading = useFetchProfile();

  if (isLoading) return <div></div>;

  return (
    <Router>
      <AuthHandler />
      <Layout>
        <PageRoutes />
      </Layout>
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;
