import React from "react";
import { Button } from "react-native";

import { openUrl } from "../helpers";

const getImdbUrl = (imdbId: string): string =>
  `https://www.imdb.com/title/${imdbId}/`;

export const ImdbButton = ({
  imdbId,
}: {
  readonly imdbId: string;
}): JSX.Element => (
  <Button title="IMDb" onPress={() => openUrl(getImdbUrl(imdbId))} />
);
