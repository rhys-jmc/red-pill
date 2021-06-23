import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { MovieDetails, ThemedView } from "../components";
import { useGetMovie } from "../services/tmdb";

import type { UpNextParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const MovieDetailsScreen = ({
  navigation: { setOptions },
  route: { params },
}: StackScreenProps<UpNextParamList, "MovieDetailsScreen">): JSX.Element => {
  const { data: movie, isLoading } = useGetMovie(params.movieId);

  useEffect(() => {
    setOptions({ headerTitle: movie?.title ? movie.title : "Loading..." });
  }, [movie?.title, setOptions]);

  return (
    <ThemedView style={styles.container}>
      {isLoading && <ActivityIndicator size="large" />}
      {movie && <MovieDetails {...{ movie }} />}
    </ThemedView>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });
