import React from "react";

import { Library } from "../components/library";
import { useBlocked } from "../context";

import type { BlockedParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const BlockedScreen = ({
  navigation: { navigate },
}: StackScreenProps<BlockedParamList, "BlockedScreen">): JSX.Element => {
  const blocked = useBlocked();

  return (
    <Library
      movieIds={blocked.list}
      navigateToMovieDetails={(movieId) =>
        navigate("MovieDetailsScreen", { movieId })
      }
    />
  );
};
