import { useContext } from "react";
import styled from "./themeSwitcher.module.css";
import { ThemeContext } from "../../context/themeContext";

const ThemeSwitcher = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <div className={styled.container} onClick={toggleTheme}>
      <img
        src="https://img.icons8.com/external-outline-berkahicon/64/external-dark-mix-ui-social-media-outline-berkahicon.png"
        alt="external-dark-mix-ui-social-media-outline-berkahicon"
      />
    </div>
  );
};

export default ThemeSwitcher;
