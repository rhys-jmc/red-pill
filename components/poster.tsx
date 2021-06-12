import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet } from "react-native";

import { useThemeColor } from "../hooks";
import { getImageUri } from "../services/tmdb";

import { ThemedView } from "./themed";

import type { ComponentProps } from "react";

export const Poster = ({
  path,
  style,
  variant,
  ...props
}: {
  readonly path?: string | null;
  readonly variant: "poster" | "profile";
  readonly style?: ComponentProps<typeof Image>["style"];
} & (
  | { readonly height?: number }
  | { readonly width?: number }
)): JSX.Element => {
  const color = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "tabIconDefault");
  const combinedStyle = [
    styles.poster,
    { backgroundColor },
    ...(Array.isArray(style) ? style : [style]),
  ];

  const dimensions =
    "width" in props && props.width
      ? {
          width: props.width,
          height: (props.width / styles.poster.width) * styles.poster.height,
        }
      : "height" in props && props.height
      ? {
          height: props.height,
          width: (props.height / styles.poster.height) * styles.poster.width,
        }
      : {};

  return path ? (
    <Image
      source={{ uri: getImageUri(path, variant) }}
      style={combinedStyle}
      accessibilityIgnoresInvertColors
      resizeMode="cover"
      {...dimensions}
    />
  ) : (
    <ThemedView style={[combinedStyle, { ...dimensions }]}>
      <Ionicons
        name={variant === "poster" ? "person" : "film"}
        color={color}
        size={48}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  poster: {
    alignItems: "center",
    borderRadius: 4,
    height: 128,
    justifyContent: "center",
    width: 85,
  },
});
