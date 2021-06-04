import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { ThemedText, ThemedView } from "../components";
import { useUpNext } from "../context/up-next";
import { useMovies } from "../services/tmdb";

export const UpNextScreen = (): JSX.Element => {
  const upNext = useUpNext();
  const { movies, isLoading } = useMovies(upNext.list);

  return (
    <ThemedView style={styles.container}>
      {isLoading && <ActivityIndicator />}
      {movies.map((m) => (
        <ThemedView key={m.id}>
          <ThemedText>{m.title}</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });
