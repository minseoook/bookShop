import "sanitize.css";
import { createGlobalStyle } from "styled-components";
import { ThemeName } from "./theme";

interface Props {
  themeName: ThemeName;
}
export const GlobalStyle = createGlobalStyle<Props>`
body{
    margin : 0;
    padding : 0;
    background-color: ${(props) =>
      props.themeName === "light" ? "light" : "black"};
}
h1{
    margin : 0;
}
*{
    color : ${(props) => (props.themeName === "light" ? "black" : "white")};
}`;
