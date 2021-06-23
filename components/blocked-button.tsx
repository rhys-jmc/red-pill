import React, { useCallback, useMemo } from "react";
import { Button } from "react-native";

import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleMovieList } from "../slices/movies";

export const BlockedButton = ({
  movieId,
}: {
  readonly movieId: number;
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const isBlocked = useAppSelector((state) => state.movies[movieId]?.isBlocked);
  const title = useMemo(() => (isBlocked ? "Unblock" : "Block"), [isBlocked]);

  const handlePress = useCallback(
    () => dispatch(toggleMovieList({ movieId, category: "isBlocked" })),
    [dispatch, movieId]
  );

  return <Button title={title} onPress={handlePress} />;
};
