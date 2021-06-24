import React from "react";
import { StyleSheet } from "react-native";

import { Search, ThemedView } from "../components";

import type { DiscoverStackParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const DiscoverScreen = ({
  navigation: { navigate },
}: StackScreenProps<DiscoverStackParamList, "DiscoverScreen">): JSX.Element => (
  <ThemedView style={styles.container}>
    <Search
      selectItem={(item) =>
        item.media_type === "movie"
          ? navigate("MovieDetailsScreen", { movieId: item.id })
          : navigate("PersonMoviesScreen", { personId: item.id })
      }
    />
  </ThemedView>
);

const styles = StyleSheet.create({ container: { flex: 1 } });
