import { format } from "date-fns";
import React from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";

import { getImageUri } from "../services/tmdb";

import { BlockedButton } from "./blocked-button";
import { ImdbButton } from "./imdb-button";
import { Poster } from "./poster";
import { ThemedText, ThemedView } from "./themed";
import { UpNextButton } from "./up-next-button";
import { WatchedButton } from "./watched-button";

import type { Movie } from "../services/tmdb";

export const MovieDetails = ({
  movie,
}: {
  readonly movie: Movie;
}): JSX.Element => (
  <ThemedView style={styles.fill}>
    <ScrollView>
      <ImageBackground
        source={{ uri: getImageUri(movie.backdrop_path ?? "", "backdrop") }}
        resizeMode="cover"
        style={styles.header}
        imageStyle={styles.headerImageStyle}
      >
        {movie.poster_path && (
          <Poster
            path={movie.poster_path}
            style={styles.poster}
            variant="poster"
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
        {movie.vote_average !== undefined && (
          <ThemedText style={styles.score}>
            {`${movie.vote_average * 10}% User Score`}
          </ThemedText>
        )}
        <ThemedView style={styles.factsContainer}>
          <ThemedText style={styles.facts}>
            {movie.release_date && (
              <ThemedText>
                {format(new Date(movie.release_date), "dd/MM/yyyy")}
              </ThemedText>
            )}
            {movie.runtime && (
              <ThemedText>
                {` - ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
              </ThemedText>
            )}
          </ThemedText>
          <ThemedText style={styles.facts}>
            {movie.genres.map((g) => g.name).join(", ")}
          </ThemedText>
          {movie.id && <UpNextButton movieId={movie.id} />}
          {movie.id && <WatchedButton movieId={movie.id} />}
          {movie.id && <BlockedButton movieId={movie.id} />}
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.info}>
        <ThemedText style={styles.tagline}>{movie.tagline}</ThemedText>
        <ThemedText style={styles.overviewHeading}>{"Overview"}</ThemedText>
        <ThemedText style={styles.overview}>{movie.overview}</ThemedText>
      </ThemedView>
      {movie.imdb_id && <ImdbButton imdbId={movie.imdb_id} />}
    </ScrollView>
  </ThemedView>
);

const styles = StyleSheet.create({
  details: { alignItems: "center", paddingHorizontal: 20 },
  facts: { fontSize: 16 },
  factsContainer: { alignItems: "center" },
  fill: { flex: 1 },
  header: { alignItems: "center", flexDirection: "row", height: 168 },
  headerImageStyle: { opacity: 0.618 },
  heading: { paddingHorizontal: 20, paddingVertical: 16 },
  info: { padding: 20 },
  overview: { fontSize: 16 },
  overviewHeading: { fontSize: 20, fontWeight: "600", marginVertical: 10 },
  poster: { marginHorizontal: 20 },
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
