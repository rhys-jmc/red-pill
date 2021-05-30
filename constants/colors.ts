export const black = "#000";
export const white = "#fff";
export const linkColor = "#2e78b7";
export const gray = "gray";
export const transparent = "transparent";

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
