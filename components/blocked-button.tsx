import React, { useCallback, useMemo } from "react";
import { Button } from "react-native";

import { useBlocked } from "../context";

export const BlockedButton = ({
  movieId,
}: {
  readonly movieId: number;
}): JSX.Element => {
  const { isBlocked, toggle } = useBlocked();
  const title = useMemo(
    () => (isBlocked(movieId) ? "Unblock" : "Block"),
    [isBlocked, movieId]
  );
  const handlePress = useCallback(() => toggle(movieId), [movieId, toggle]);

  return <Button title={title} onPress={handlePress} />;
};
