import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { linkColor, white } from "../constants/colors";

import type { RootStackParamList } from "../types";
import type { StackScreenProps } from "@react-navigation/stack";

export const NotFoundScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, "NotFound">): JSX.Element => (
  <View style={styles.container}>
    <Text style={styles.title}>This screen doesn&apos;t exist.</Text>
    <TouchableOpacity
      onPress={() => navigation.replace("Root")}
      style={styles.link}
    >
      <Text style={styles.linkText}>Go to home screen!</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: white,
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  link: { marginTop: 15, paddingVertical: 15 },
  linkText: { color: linkColor, fontSize: 14 },
  title: { fontSize: 20, fontWeight: "bold" },
});
