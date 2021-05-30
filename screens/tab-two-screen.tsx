import React from "react";
import { StyleSheet } from "react-native";

import { ThemedText, ThemedView, EditScreenInfo } from "../components";

export const TabTwoScreen = (): JSX.Element => (
  <ThemedView style={styles.container}>
    <ThemedText style={styles.title}>{"Tab Two"}</ThemedText>
    <ThemedView
      style={styles.separator}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
    <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
  </ThemedView>
);

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1, justifyContent: "center" },
  separator: { height: 1, marginVertical: 30, width: "80%" },
  title: { fontSize: 20, fontWeight: "bold" },
});
