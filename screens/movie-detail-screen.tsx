import { format } from "date-fns";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";

import { Text, View } from "../components/themed";
import { useMovie } from "../services/tmdb/hooks";

import type { TabOneParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

const getImageUri = (path: string, variant: "poster" | "backdrop"): string =>
  `https://themoviedb.org/t/p/${
    variant === "poster" ? "w600_and_h900_bestv2" : "w1000_and_h450_multi_faces"
  }${path}`;

export const MovieDetailScreen = ({
  route: { params },
}: StackScreenProps<TabOneParamList, "MovieDetailScreen">): JSX.Element => {
  const { isLoading, ...result } = useMovie(params.movie.id);

  const movie = { ...params.movie, ...result.movie };

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}
      <ImageBackground
        source={{ uri: getImageUri(movie.backdrop_path ?? "", "backdrop") }}
        resizeMode="cover"
        style={styles.header}
        imageStyle={styles.headerImageStyle}
      >
        {movie.poster_path && (
          <Image
            source={{ uri: getImageUri(movie.poster_path, "poster") }}
            style={styles.poster}
            accessibilityIgnoresInvertColors
            resizeMode="contain"
          />
        )}
      </ImageBackground>
      <View style={styles.details}>
        <Text style={styles.heading}>
          <Text style={styles.title}>{movie.title} </Text>
          <Text style={styles.year}>
            ({new Date(movie.release_date).getFullYear()})
          </Text>
        </Text>
        <Text style={styles.score}>{movie.vote_average * 10}% User Score</Text>
        <View>
          <Text style={styles.facts}>
            <Text>{format(new Date(movie.release_date), "dd/MM/yyyy")}</Text>
            {"runtime" in movie && movie.runtime && (
              <Text>
                {" "}
                - {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </Text>
            )}
          </Text>
          {"genres" in movie && (
            <Text style={styles.facts}>
              {movie.genres.map((g, index, array) => (
                <Text key={g.id}>
                  {g.name}
                  {index !== array.length - 1 && ", "}
                </Text>
              ))}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.info}>
        {"tagline" in movie && (
          <Text style={styles.tagline}>{movie.tagline}</Text>
        )}
        <Text style={styles.overviewHeading}>Overview</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "stretch" },
  details: { alignItems: "center", paddingHorizontal: 20 },
  facts: { fontSize: 16 },
  header: { alignItems: "center", flexDirection: "row", height: 168 },
  headerImageStyle: { opacity: 0.618 },
  heading: { paddingHorizontal: 20, paddingVertical: 16, textAlign: "center" },
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
