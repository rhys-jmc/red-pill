import React, { useCallback, useMemo } from "react";
import { Button } from "react-native";

import { useBlocked, useWatched } from "../context";

export const WatchedButton = ({
  movieId,
}: {
  readonly movieId: number;
}): JSX.Element | null => {
  const { isBlocked } = useBlocked();
  const { hasWatched, toggle } = useWatched();
  const handlePress = useCallback(() => toggle(movieId), [movieId, toggle]);
  const title = useMemo(
    () => (hasWatched(movieId) ? "Unwatch" : "Watched"),
    [hasWatched, movieId]
  );

  return isBlocked(movieId) ? null : (
    <Button title={title} onPress={handlePress} />
  );
};
