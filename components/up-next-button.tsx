import React, { useCallback, useMemo } from "react";
import { Button } from "react-native";

import { useUpNext } from "../context/up-next";

export const UpNextButton = ({
  movieId,
}: {
  readonly movieId: number;
}): JSX.Element => {
  const { includes, toggle } = useUpNext();
  const title = useMemo(
    () => `${includes(movieId) ? "Remove from" : "Add to"} Up Next`,
    [includes, movieId]
  );
  const handlePress = useCallback(() => toggle(movieId), [movieId, toggle]);

  return <Button title={title} onPress={handlePress} />;
};
