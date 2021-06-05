import React, { useCallback, useMemo } from "react";
import { Button } from "react-native";

import { useWatched } from "../context/watched";

export const WatchedButton = ({
  movieId,
}: {
  readonly movieId: number;
}): JSX.Element => {
  const { includes, toggle } = useWatched();
  const title = useMemo(
    () => (includes(movieId) ? "Unwatch" : "Watch"),
    [includes, movieId]
  );
  const handlePress = useCallback(() => toggle(movieId), [movieId, toggle]);

  return <Button title={title} onPress={handlePress} />;
};
