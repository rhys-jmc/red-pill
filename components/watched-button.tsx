import React, { useCallback, useMemo } from "react";
import { Button } from "react-native";

import { useBlocked, useWatched } from "../context";

export const WatchedButton = ({
  movieId,
}: {
  readonly movieId: number;
}): JSX.Element | null => {
  const { isBlocked } = useBlocked();
  const { includes, toggle } = useWatched();
  const title = useMemo(
    () => (includes(movieId) ? "Unwatch" : "Watch"),
    [includes, movieId]
  );
  const handlePress = useCallback(() => toggle(movieId), [movieId, toggle]);

  return isBlocked(movieId) ? null : (
    <Button title={title} onPress={handlePress} />
  );
};
