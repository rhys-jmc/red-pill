import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Poster, ThemedView } from "../components";
import { useBlocked } from "../context";
import { useLayout } from "../hooks";
import { useMovies } from "../services/tmdb";

import type { BlockedParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const BlockedScreen = ({
  navigation: { navigate },
}: StackScreenProps<BlockedParamList, "BlockedScreen">): JSX.Element => {
  const blocked = useBlocked();
  const { window } = useLayout();
  const posterWidth = (window.width - 20) / 3 - 20;
  const { movies, isLoading } = useMovies({
    movieIds: blocked.list,
    showBlocked: true,
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {isLoading && <ActivityIndicator size="large" />}
        <ThemedView style={styles.posters}>
          {movies.map((m) => (
            <TouchableOpacity
              key={m.id}
              onPress={() => navigate("MovieDetailsScreen", { movieId: m.id })}
            >
              <Poster
                path={m.poster_path ?? ""}
                width={posterWidth}
                style={styles.poster}
              />
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  poster: { marginBottom: 20, marginLeft: 20 },
  posters: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginRight: 20,
    marginTop: 20,
  },
});
