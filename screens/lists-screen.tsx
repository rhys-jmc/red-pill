import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Library } from "../components/library";
import { useAppSelector } from "../hooks";

import type { ListsStackParamList } from "../navigation/types";
import type { ListCategory } from "../services/tmdb";
import type { StackScreenProps } from "@react-navigation/stack";

const listCategories = ["isUpNext", "hasWatched", "isBlocked"] as const;
const listLabels = ["Up Next", "Watched", "Blocked"];

export const ListsScreen = ({
  navigation: { navigate },
}: StackScreenProps<ListsStackParamList, "ListsScreen">): JSX.Element => {
  const [tab, setTab] = useState<ListCategory>("isUpNext");
  const movieIds = useAppSelector((state) =>
    Object.values(state.movies)
      .filter((m) => m[tab])
      .map((m) => m.movieId)
  );

  return (
    <View style={styles.fill}>
      <SegmentedControl
        values={listLabels}
        selectedIndex={listCategories.indexOf(tab)}
        onChange={({ nativeEvent }) =>
          setTab(listCategories[nativeEvent.selectedSegmentIndex] ?? "isUpNext")
        }
      />
      <Library
        movieIds={movieIds}
        navigateToMovieDetails={(movieId) =>
          navigate("MovieDetailsScreen", { movieId })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({ fill: { flex: 1 } });
