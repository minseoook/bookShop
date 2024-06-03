import { useContext } from "react";
import styled from "./themeSwitcher.module.css";
import { ThemeContext } from "../../context/themeContext";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={styled.container} onClick={toggleTheme}>
      {theme === "light" ? (
        <img
          src="https://img.icons8.com/pulsar-color/48/moon-symbol.png"
          alt="moon-symbol"
        />
      ) : (
        <img
          src="https://img.icons8.com/external-flat-papa-vector/78/external-Light-Mode-interface-flat-papa-vector.png"
          alt="external-Light-Mode-interface-flat-papa-vector"
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
