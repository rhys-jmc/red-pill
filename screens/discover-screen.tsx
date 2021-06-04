import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import { MovieDetails, MovieSearch, ThemedView } from "../components";
import { useLayout } from "../hooks";
import { useMovie } from "../services/tmdb";

import type { SearchMovieResult } from "../services/tmdb";

export const DiscoverScreen = (): JSX.Element => {
  const { window } = useLayout();
  const [height, setHeight] = useState(window.height);
  const [movieResult, setMovieResult] = useState<SearchMovieResult>();
  const { movie, isLoading } = useMovie(movieResult?.id);

  return (
    <ThemedView
      onLayout={({ nativeEvent: { layout } }) => setHeight(layout.height)}
      style={styles.container}
    >
      <ThemedView style={styles.searchContainer}>
        <MovieSearch
          movie={movieResult}
          maxHeight={height * (1 - 0.618)}
          selectMovie={setMovieResult}
        />
      </ThemedView>
      {isLoading && <ActivityIndicator size="large" />}
      {movie && (
        <ScrollView>
          <MovieDetails {...{ movie }} />
        </ScrollView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { zIndex: 1 },
});
