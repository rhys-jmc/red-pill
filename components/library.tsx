import equal from "fast-deep-equal";
import React, { memo, useCallback } from "react";
import { TouchableOpacity, StyleSheet, FlatList } from "react-native";

import { useLayout } from "../hooks";
import { useGetMovie } from "../services/tmdb";

import { Poster } from "./poster";
import { ThemedView } from "./themed";

const keyExtractor = (id: number): string => `${id}`;
const posterMargin = 20;

const MemoLibraryItem = ({
  movieId,
  navigateToMovieDetails,
}: {
  readonly movieId: number;
  readonly navigateToMovieDetails: (movieId: number) => void;
}): JSX.Element => {
  const { data: movie } = useGetMovie(movieId);
  const { window } = useLayout();
  const posterWidth = (window.width - posterMargin * 4) / 3;

  return (
    <TouchableOpacity onPress={() => navigateToMovieDetails(movieId)}>
      <Poster
        movieId={movie?.id}
        path={movie?.poster_path}
        width={posterWidth}
        variant="poster"
        style={styles.poster}
      />
    </TouchableOpacity>
  );
};

const LibraryItem = memo(MemoLibraryItem, equal);

const MemoLibrary = ({
  movieIds: data,
  navigateToMovieDetails,
}: {
  readonly movieIds: readonly number[];
  readonly navigateToMovieDetails: (movieId: number) => void;
}): JSX.Element => {
  const renderItem = useCallback(
    ({
      item: movieId,
    }: {
      readonly item: typeof data[number];
    }): JSX.Element => <LibraryItem {...{ movieId, navigateToMovieDetails }} />,
    [navigateToMovieDetails]
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList {...{ data, keyExtractor, numColumns: 3, renderItem }} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: posterMargin / 2 },
  poster: { margin: posterMargin / 2 },
});

export const Library = memo(MemoLibrary, equal);
