import { theme } from "../constants";

import { useColorScheme } from "./use-color-scheme";

export const useThemeColor = (
  props: { readonly light?: string; readonly dark?: string },
  colorName: keyof typeof theme.light & keyof typeof theme.dark
): string => {
  const scheme = useColorScheme();
  const colorFromProps = props[scheme];

  return colorFromProps ? colorFromProps : theme[scheme][colorName];
};
