import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { ItemList, ThemedView } from "../components";
import { useGetPerson, useGetPersonMovieCredits } from "../services/tmdb";

import type { SearchStackParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const PersonMoviesScreen = ({
  navigation: { navigate, setOptions },
  route: { params },
}: StackScreenProps<
  SearchStackParamList,
  "PersonMoviesScreen"
>): JSX.Element => {
  const { data: person } = useGetPerson(params.personId);
  const { data: movieCredits, isLoading } = useGetPersonMovieCredits(
    params.personId
  );

  useEffect(() => {
    setOptions({ headerTitle: person?.name ? person.name : "Loading..." });
  }, [person?.name, setOptions]);

  return (
    <ThemedView style={styles.container}>
      {isLoading && <ActivityIndicator size="large" />}
      {movieCredits && (
        <ItemList
          items={[...movieCredits.cast, ...movieCredits.crew]
            // unique index
            .filter(
              (m, index, array) =>
                array.map((x) => x.id).indexOf(m.id) === index
            )
            .sort((a, b) => b.popularity - a.popularity)
            .map((m) => ({ ...m, media_type: "movie" }))}
          selectItem={(item) =>
            item.media_type === "movie"
              ? navigate("MovieDetailsScreen", { movieId: item.id })
              : navigate("PersonMoviesScreen", { personId: item.id })
          }
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });
