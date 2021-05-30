import { white, black } from "./colors";

const tintColorLight = "#2f95dc";
const tintColorDark = white;

export const theme = {
  light: {
    text: black,
    background: white,
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: white,
    background: black,
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
