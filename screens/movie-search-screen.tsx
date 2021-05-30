import React, { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, TextInput } from "react-native";

import { useThemeColor, View } from "../components/themed";
import { gray } from "../constants/colors";
import { useSearchMovies } from "../services/tmdb/hooks";

import type { TabOneParamList } from "../navigation/types";
import type { StackScreenProps } from "@react-navigation/stack";

export const MovieSearchScreen = ({
  navigation,
}: StackScreenProps<TabOneParamList, "MovieSearchScreen">): JSX.Element => {
  const [input, setInput] = useState("");
  const { movies, isLoading } = useSearchMovies(input);
  const color = useThemeColor({}, "text");

  return (
    <View>
      <TextInput
        style={[styles.textInput, { color }]}
        onChangeText={setInput}
        value={input}
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {isLoading && <ActivityIndicator />}
      {movies.map((movie) => (
        <Button
          key={movie.id}
          onPress={() => navigation.navigate("MovieDetailScreen", { movie })}
          title={movie.title}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: { borderColor: gray, borderWidth: 1, height: 40 },
});
