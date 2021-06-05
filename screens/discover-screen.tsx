import React from "react";
import { StyleSheet } from "react-native";

import { MovieSearch, ThemedView } from "../components";

import type { DiscoverParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const DiscoverScreen = ({
  navigation: { navigate },
}: StackScreenProps<DiscoverParamList, "DiscoverScreen">): JSX.Element => (
  <ThemedView style={styles.container}>
    <ThemedView style={styles.searchContainer}>
      <MovieSearch
        selectMovie={(m) => navigate("MovieDetailsScreen", { movieId: m.id })}
      />
    </ThemedView>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { zIndex: 1 },
});
