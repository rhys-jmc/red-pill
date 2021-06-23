import React from "react";

import { Library } from "../components/library";
import { useAppSelector } from "../hooks";

import type { UpNextParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const UpNextScreen = ({
  navigation: { navigate },
}: StackScreenProps<UpNextParamList, "UpNextScreen">): JSX.Element => {
  const upNext = useAppSelector((state) =>
    Object.values(state.movies)
      .filter((m) => m.isUpNext)
      .map((m) => m.movieId)
  );

  return (
    <Library
      movieIds={upNext}
      navigateToMovieDetails={(movieId) =>
        navigate("MovieDetailsScreen", { movieId })
      }
    />
  );
};
