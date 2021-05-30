import React from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "./themed";

import type { TextProps } from "./themed";

export const MonoText = ({ style, ...props }: TextProps): JSX.Element => (
  <ThemedText {...props} style={[style, styles.text]} />
);

const styles = StyleSheet.create({ text: { fontFamily: "space-mono" } });
