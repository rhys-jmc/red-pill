import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { MovieDetails, MovieSearch, View } from "../components";
import { useLayout } from "../hooks";

import type { SearchMovieResult } from "../services/tmdb/types";

export const DiscoverScreen = (): JSX.Element => {
  const { window } = useLayout();
  const [height, setHeight] = useState(window.height);
  const [movie, setMovie] = useState<SearchMovieResult>();

  return (
    <View
      onLayout={({ nativeEvent: { layout } }) => setHeight(layout.height)}
      style={styles.container}
    >
      <View style={styles.searchContainer}>
        <MovieSearch
          movie={movie}
          maxHeight={height * (1 - 0.618)}
          selectMovie={setMovie}
        />
      </View>
      {movie && (
        <ScrollView>
          <MovieDetails movie={movie} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { zIndex: 1 },
});
