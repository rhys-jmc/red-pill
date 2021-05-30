/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";

import { theme } from "../constants/colors";
import { useColorScheme } from "../hooks/use-color-scheme";

export const useThemeColor = (
  props: { readonly light?: string; readonly dark?: string },
  colorName: keyof typeof theme.light & keyof typeof theme.dark
): string => {
  const scheme = useColorScheme();
  const colorFromProps = props[scheme];

  return colorFromProps ? colorFromProps : theme[scheme][colorName];
};

type ThemeProps = {
  readonly lightColor?: string;
  readonly darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export const Text = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: TextProps): JSX.Element => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export const View = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ViewProps): JSX.Element => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};
