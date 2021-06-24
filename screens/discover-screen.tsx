import React from "react";

import { ItemList } from "../components";
import { useDiscoverMovies } from "../services/tmdb";

import type { DiscoverStackParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const DiscoverScreen = ({
  navigation: { navigate },
}: StackScreenProps<DiscoverStackParamList, "DiscoverScreen">): JSX.Element => {
  const { data } = useDiscoverMovies(undefined);
  const items =
    data?.results.map((m) => ({ ...m, media_type: "movie" as const })) ?? [];

  return (
    <ItemList
      items={items}
      selectItem={(item) =>
        item.media_type === "movie"
          ? navigate("MovieDetailsScreen", { movieId: item.id })
          : navigate("PersonMoviesScreen", { personId: item.id })
      }
    />
  );
};
