import React from "react";
import { StyleSheet } from "react-native";

import { EditScreenInfo } from "../components/edit-screen-info";
import { Text, View } from "../components/themed";

export const TabTwoScreen = (): JSX.Element => (
  <View style={styles.container}>
    <Text style={styles.title}>Tab Two</Text>
    <View
      style={styles.separator}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
    <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1, justifyContent: "center" },
  separator: { height: 1, marginVertical: 30, width: "80%" },
  title: { fontSize: 20, fontWeight: "bold" },
});
