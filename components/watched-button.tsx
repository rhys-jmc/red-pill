import React, { useCallback } from "react";
import { Button } from "react-native";

import { useAppDispatch, useAppSelector } from "../hooks";
import { toggleMovieList } from "../slices/movies";

export const WatchedButton = ({
  movieId,
}: {
  readonly movieId: number;
}): JSX.Element | null => {
  const dispatch = useAppDispatch();
  const movieListData = useAppSelector((state) => state.movies[movieId]);
  const title = movieListData?.hasWatched ? "Unwatch" : "Watched";

  const handlePress = useCallback(
    () => dispatch(toggleMovieList({ movieId, category: "hasWatched" })),
    [dispatch, movieId]
  );

  return movieListData?.isBlocked ? null : (
    <Button title={title} onPress={handlePress} />
  );
};
