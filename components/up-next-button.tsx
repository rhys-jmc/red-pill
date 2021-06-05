import React, { useCallback, useMemo } from "react";
import { Button } from "react-native";

import { useBlocked, useUpNext } from "../context";

export const UpNextButton = ({
  movieId,
}: {
  readonly movieId: number;
}): JSX.Element | null => {
  const { isBlocked } = useBlocked();
  const { includes, toggle } = useUpNext();
  const title = useMemo(
    () => `${includes(movieId) ? "Remove from" : "Add to"} Up Next`,
    [includes, movieId]
  );
  const handlePress = useCallback(() => toggle(movieId), [movieId, toggle]);

  return isBlocked(movieId) ? null : (
    <Button title={title} onPress={handlePress} />
  );
};
