import { useContext } from "react";
import "./App.css";
import { ThemeContext } from "./context/themeContext";

import Layout from "./layout/Layout";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div data-theme={theme}>
      <Layout>성민석성민섣ㄱ</Layout>
    </div>
  );
}

export default App;
