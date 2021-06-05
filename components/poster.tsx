import React from "react";
import { Image, StyleSheet } from "react-native";

import { getImageUri } from "../services/tmdb";

import type { ComponentProps } from "react";

export const Poster = ({
  path,
  style,
  width,
}: {
  readonly path: string;
  readonly style?: ComponentProps<typeof Image>["style"];
  readonly width?: number;
}): JSX.Element => (
  <Image
    source={{ uri: getImageUri(path, "poster") }}
    style={[styles.poster, ...(Array.isArray(style) ? style : [style])]}
    accessibilityIgnoresInvertColors
    resizeMode="contain"
    {...(width
      ? { width, height: (width / styles.poster.width) * styles.poster.height }
      : {})}
    // width={width}
    // height={width && (width / styles.poster.width) * styles.poster.height}
  />
);

const styles = StyleSheet.create({
  poster: { borderRadius: 4, height: 128, width: 85 },
});
