import React from "react";
import { StyleSheet } from "react-native";

import { ThemedText, ThemedView } from "./themed";

export const ErrorWasThrown = (): JSX.Element => (
  <ThemedView style={styles.fill}>
    <ThemedText style={styles.text}>{`I'm so sorry!
An error occurred :(
The error has been reported.
Please restart the app.
I'll hopefully sort out the error soon! <3`}</ThemedText>
  </ThemedView>
);

const styles = StyleSheet.create({
  fill: { alignItems: "center", flex: 1, justifyContent: "center" },
  text: { textAlign: "center" },
});
