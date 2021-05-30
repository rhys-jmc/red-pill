import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { MovieDetails, MovieSearch, ThemedView } from "../components";
import { useLayout } from "../hooks";

import type { SearchMovieResult } from "../services/tmdb";

export const DiscoverScreen = (): JSX.Element => {
  const { window } = useLayout();
  const [height, setHeight] = useState(window.height);
  const [movie, setMovie] = useState<SearchMovieResult>();

  return (
    <ThemedView
      onLayout={({ nativeEvent: { layout } }) => setHeight(layout.height)}
      style={styles.container}
    >
      <ThemedView style={styles.searchContainer}>
        <MovieSearch
          movie={movie}
          maxHeight={height * (1 - 0.618)}
          selectMovie={setMovie}
        />
      </ThemedView>
      {movie && (
        <ScrollView>
          <MovieDetails movie={movie} />
        </ScrollView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { zIndex: 1 },
});
