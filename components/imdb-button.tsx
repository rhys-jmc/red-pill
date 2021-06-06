import React from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { openUrl } from "../helpers";

const getImdbUrl = (imdbId: string): string =>
  `https://www.imdb.com/title/${imdbId}/`;

export const ImdbButton = ({
  imdbId,
}: {
  readonly imdbId: string;
}): JSX.Element => (
  <TouchableOpacity onPress={() => openUrl(getImdbUrl(imdbId))}>
    <Image
      source={{
        uri: "https://ia.media-imdb.com/images/M/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@._V1_.png",
      }}
      style={styles.image}
      accessibilityIgnoresInvertColors
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({ image: { height: 48, width: 100 } });
