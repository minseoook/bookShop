type ColorKey = "primary" | "secondary" | "third" | "background";
export type ThemeName = "light" | "dark";
interface Theme {
  name: ThemeName;
  color: Record<ColorKey, string>;
}

export const light: Theme = {
  name: "light",
  color: {
    primary: "brown",
    background: "lightgrey",
    secondary: "blue",
    third: "green",
  },
};
export const dark: Theme = {
  name: "dark",
  color: {
    primary: "coral",
    background: "midnightblue",
    secondary: "blue",
    third: "green",
  },
};

export const getTheme = (themeName: ThemeName): Theme => {
  switch (themeName) {
    case "light":
      return light;
    case "dark":
      return dark;
  }
};
