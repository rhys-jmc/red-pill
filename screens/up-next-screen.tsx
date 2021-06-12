import React from "react";

import { Library } from "../components/library";
import { useUpNext } from "../context";

import type { UpNextParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const UpNextScreen = ({
  navigation: { navigate },
}: StackScreenProps<UpNextParamList, "UpNextScreen">): JSX.Element => {
  const upNext = useUpNext();

  return (
    <Library
      movieIds={upNext.list}
      navigateToMovieDetails={(movieId) =>
        navigate("MovieDetailsScreen", { movieId })
      }
    />
  );
};
