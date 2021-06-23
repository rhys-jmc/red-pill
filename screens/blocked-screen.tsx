import React from "react";

import { Library } from "../components/library";
import { useAppSelector } from "../hooks";

import type { BlockedParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const BlockedScreen = ({
  navigation: { navigate },
}: StackScreenProps<BlockedParamList, "BlockedScreen">): JSX.Element => {
  const blocked = useAppSelector((state) =>
    Object.values(state.movies)
      .filter((m) => m.isBlocked)
      .map((m) => m.movieId)
  );

  return (
    <Library
      movieIds={blocked}
      navigateToMovieDetails={(movieId) =>
        navigate("MovieDetailsScreen", { movieId })
      }
    />
  );
};
