import { useContext } from "react";
import "./App.css";
import { ThemeContext } from "./context/themeContext";

import Layout from "./layout/Layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Error from "./pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
]);
function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div data-theme={theme} className="app-container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
