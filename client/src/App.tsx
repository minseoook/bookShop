import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { ThemeName, dark, getTheme, light } from "./style/theme";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { useContext, useState } from "react";
import { BookStoreThemeProvider, ThemeContext } from "./context/themeContext";
const App = () => {
  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
};

export default App;
