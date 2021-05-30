import React from "react";
import { Button, StyleSheet } from "react-native";

import { EditScreenInfo } from "../components/edit-screen-info";
import { Text, View } from "../components/themed";

import type { TabOneParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const TabOneScreen = ({
  navigation,
}: StackScreenProps<TabOneParamList, "TabOneScreen">): JSX.Element => (
  <View style={styles.container}>
    <Text style={styles.title}>Tab One</Text>
    <View
      style={styles.separator}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
    <Button
      onPress={() => navigation.navigate("MovieSearchScreen")}
      title="go to movie search"
    />
    <EditScreenInfo path="/screens/TabOneScreen.tsx" />
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1, justifyContent: "center" },
  separator: { height: 1, marginVertical: 30, width: "80%" },
  title: { fontSize: 20, fontWeight: "bold" },
});
