import React from "react";
import { Image, StyleSheet } from "react-native";

import { getImageUri } from "../services/tmdb";

import type { ComponentProps } from "react";

export const Poster = ({
  path,
  style,
  ...props
}: {
  readonly path: string;
  readonly style?: ComponentProps<typeof Image>["style"];
} & (
  | { readonly height?: number }
  | { readonly width?: number }
)): JSX.Element => (
  <Image
    source={{ uri: getImageUri(path, "poster") }}
    style={[styles.poster, ...(Array.isArray(style) ? style : [style])]}
    accessibilityIgnoresInvertColors
    resizeMode="contain"
    {...("width" in props && props.width
      ? {
          width: props.width,
          height: (props.width / styles.poster.width) * styles.poster.height,
        }
      : {})}
    {...("height" in props && props.height
      ? {
          height: props.height,
          width: (props.height / styles.poster.height) * styles.poster.width,
        }
      : {})}
  />
);

const styles = StyleSheet.create({
  poster: { borderRadius: 4, height: 128, width: 85 },
});
