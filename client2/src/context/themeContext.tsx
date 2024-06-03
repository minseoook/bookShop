import { createContext, useEffect, useState } from "react";

const THEME_LOCALSTORAGE_KEY = "theme";

type themeName = "light" | "dark";

type State = {
  theme: themeName;
  toggleTheme: () => void;
};
const state = {
  theme: "light" as themeName,
  toggleTheme: () => {},
};
type Props = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<State>(state);

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<themeName>("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem(
      THEME_LOCALSTORAGE_KEY,
      theme === "light" ? "dark" : "light"
    );
  };

  useEffect(() => {
    const savedTHemeName = localStorage.getItem(
      THEME_LOCALSTORAGE_KEY
    ) as themeName;
    setTheme(savedTHemeName);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
