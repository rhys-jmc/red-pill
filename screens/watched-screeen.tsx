import React from "react";

import { Library } from "../components/library";
import { useAppSelector } from "../hooks";

import type { WatchedParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const WatchedScreen = ({
  navigation: { navigate },
}: StackScreenProps<WatchedParamList, "WatchedScreen">): JSX.Element => {
  const watched = useAppSelector((state) =>
    Object.values(state.movies)
      .filter((m) => m.hasWatched)
      .map((m) => m.movieId)
  );

  return (
    <Library
      movieIds={watched}
      navigateToMovieDetails={(movieId) =>
        navigate("MovieDetailsScreen", { movieId })
      }
    />
  );
};
