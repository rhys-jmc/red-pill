import { format } from "date-fns";
import React from "react";
import { Image, ImageBackground, ScrollView, StyleSheet } from "react-native";

import { getImageUri, useGetMovieProviders } from "../services/tmdb";

import { BlockedButton } from "./blocked-button";
import { ImdbButton } from "./imdb-button";
import { Poster } from "./poster";
import { ThemedText, ThemedView } from "./themed";
import { UpNextButton } from "./up-next-button";
import { WatchedButton } from "./watched-button";

import type { Movie, ProviderMap } from "../services/tmdb";

export const MovieDetails = ({
  movie,
}: {
  readonly movie: Movie;
}): JSX.Element => {
  const { data } = useGetMovieProviders(movie.id);
  const providerMap = data?.results.AU ?? {};

  return (
    <ScrollView contentContainerStyle={styles.page} style={styles.fill}>
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
      {providerMap && (
        <>
          {Object.entries(filterProviderMap(providerMap))
            .sort(([a], [b]) => order.indexOf(a) - order.indexOf(b))
            .map(([key, providers]) => (
              <ThemedView key={key} style={styles.providersContainer}>
                <ThemedText style={styles.providerCategory}>
                  {key === "flatrate" ? "stream" : key}
                </ThemedText>
                <ScrollView
                  horizontal
                  contentContainerStyle={styles.providerContainer}
                >
                  {[...providers]
                    .sort((a, b) => b.display_priority - a.display_priority)
                    .map((p) => (
                      <Image
                        key={p.provider_id}
                        source={{ uri: getImageUri(p.logo_path, "provider") }}
                        style={styles.provider}
                        accessibilityIgnoresInvertColors
                      />
                    ))}
                </ScrollView>
              </ThemedView>
            ))}
        </>
      )}
    </ScrollView>
  );
};

// writing the type seems to break it
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const filterProviderMap = (providerMap: Omit<ProviderMap, "link">) => {
  const { buy, flatrate, rent } = providerMap;

  return {
    ...(buy ? { buy } : {}),
    ...(flatrate ? { flatrate } : {}),
    ...(rent ? { rent } : {}),
  };
};

const order = ["flatrate", "rent", "buy"];

const styles = StyleSheet.create({
  details: { alignItems: "center", paddingHorizontal: 20 },
  facts: { fontSize: 16 },
  factsContainer: { alignItems: "center" },
  fill: { flex: 1 },
  header: {
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    height: 168,
  },
  headerImageStyle: { opacity: 0.618 },
  heading: { paddingHorizontal: 20, paddingVertical: 16 },
  info: { padding: 20 },
  overview: { fontSize: 16 },
  overviewHeading: { fontSize: 20, fontWeight: "600", marginVertical: 10 },
  page: { alignItems: "center", paddingBottom: 20 },
  poster: { marginHorizontal: 20 },
  provider: { borderRadius: 4, height: 48, marginRight: 8, width: 48 },
  providerCategory: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    marginLeft: 20,
    marginTop: 12,
    textTransform: "capitalize",
  },
  providerContainer: { paddingHorizontal: 20 },
  providersContainer: { alignSelf: "stretch" },
  score: { fontSize: 16, fontWeight: "700" },
  tagline: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "400",
    opacity: 0.618,
  },
  title: { fontSize: 22, fontWeight: "600", textAlign: "center" },
  year: { fontSize: 18, fontWeight: "400" },
});
