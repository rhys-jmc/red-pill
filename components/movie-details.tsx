import { format } from "date-fns";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";

import { getTmdbImageUri, useMovie } from "../services/tmdb";

import { ThemedText, ThemedView } from "./themed";

import type { SearchMovieResult } from "../services/tmdb";

export const MovieDetails = (props: {
  readonly movie: SearchMovieResult;
}): JSX.Element => {
  const { isLoading, ...result } = useMovie(props.movie.id);

  const movie = { ...props.movie, ...result.movie };

  return (
    <ThemedView style={styles.container}>
      {isLoading && <ActivityIndicator />}
      <ImageBackground
        source={{ uri: getTmdbImageUri(movie.backdrop_path ?? "", "backdrop") }}
        resizeMode="cover"
        style={styles.header}
        imageStyle={styles.headerImageStyle}
      >
        {movie.poster_path && (
          <Image
            source={{ uri: getTmdbImageUri(movie.poster_path, "poster") }}
            style={styles.poster}
            accessibilityIgnoresInvertColors
            resizeMode="contain"
          />
        )}
      </ImageBackground>
      <ThemedView style={styles.details}>
        <ThemedText style={styles.heading}>
          <ThemedText style={styles.title}>{movie.title}</ThemedText>
          {movie.release_date && (
            <ThemedText style={styles.year}>
              {` (${new Date(movie.release_date).getFullYear()})`}
            </ThemedText>
          )}
        </ThemedText>
        <ThemedText style={styles.score}>
          {`${movie.vote_average * 10}% User Score`}
        </ThemedText>
        <ThemedView>
          <ThemedText style={styles.facts}>
            {movie.release_date && (
              <ThemedText>
                {format(new Date(movie.release_date), "dd/MM/yyyy")}
              </ThemedText>
            )}
            {"runtime" in movie && movie.runtime && (
              <ThemedText>
                {` - ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
              </ThemedText>
            )}
          </ThemedText>
          {"genres" in movie && (
            <ThemedText style={styles.facts}>
              {movie.genres.map((g, index, array) => (
                <ThemedText key={g.id}>
                  {g.name}
                  {index !== array.length - 1 && ", "}
                </ThemedText>
              ))}
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.info}>
        {"tagline" in movie && (
          <ThemedText style={styles.tagline}>{movie.tagline}</ThemedText>
        )}
        <ThemedText style={styles.overviewHeading}>{"Overview"}</ThemedText>
        <ThemedText style={styles.overview}>{movie.overview}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "stretch" },
  details: { alignItems: "center", paddingHorizontal: 20 },
  facts: { fontSize: 16 },
  header: { alignItems: "center", flexDirection: "row", height: 168 },
  headerImageStyle: { opacity: 0.618 },
  heading: { paddingHorizontal: 20, paddingVertical: 16 },
  info: { padding: 20 },
  overview: { fontSize: 16 },
  overviewHeading: { fontSize: 20, fontWeight: "600", marginVertical: 10 },
  poster: { borderRadius: 4, height: 128, marginHorizontal: 20, width: 85 },
  score: { fontSize: 16, fontWeight: "700" },
  tagline: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "400",
    opacity: 0.618,
  },
  title: { fontSize: 22, fontWeight: "600" },
  year: { fontSize: 18, fontWeight: "400" },
});
