import { createContext, ReactNode, useEffect, useState } from "react";
import { getTheme, ThemeName } from "../style/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";

const THEME_LOCALSTORAGE_KEY = "book_store_theme";

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}
export const state = {
  themeName: "light" as ThemeName,
  toggleTheme: () => {},
};
export const ThemeContext = createContext<State>(state);

export const BookStoreThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  const toggleTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
    localStorage.setItem(
      THEME_LOCALSTORAGE_KEY,
      themeName === "light" ? "dark" : "light"
    );
  };

  useEffect(() => {
    const savedTHemeName = localStorage.getItem(
      THEME_LOCALSTORAGE_KEY
    ) as ThemeName;
    setThemeName(savedTHemeName || "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
