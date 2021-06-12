import React from "react";

import { Library } from "../components/library";
import { useWatched } from "../context";

import type { WatchedParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const WatchedScreen = ({
  navigation: { navigate },
}: StackScreenProps<WatchedParamList, "WatchedScreen">): JSX.Element => {
  const watched = useWatched();

  return (
    <Library
      movieIds={watched.list}
      navigateToMovieDetails={(movieId) =>
        navigate("MovieDetailsScreen", { movieId })
      }
    />
  );
};
