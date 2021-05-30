import { Ionicons } from "@expo/vector-icons";
import { transparentize } from "polished";
import React, { useRef, useState } from "react";
import {
  TextInput,
  ActivityIndicator,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

import { colors } from "../constants";
import { useThemeColor } from "../hooks";
import { useSearchMovies } from "../services/tmdb/hooks";

import { View } from "./themed";

import type { SearchMovieResult } from "../services/tmdb/types";
import type { ViewStyle } from "react-native";

export const MovieSearch = ({
  maxHeight,
  movie,
  selectMovie,
}: {
  readonly maxHeight: NonNullable<ViewStyle["maxHeight"]>;
  readonly movie: SearchMovieResult | undefined;
  readonly selectMovie: (movie: SearchMovieResult) => void;
}): JSX.Element => {
  const textInputRef = useRef<TextInput>(null);
  const [input, setInput] = useState<string>();
  const { movies, isLoading } = useSearchMovies(input ?? "");
  const color = useThemeColor({}, "text");

  return (
    <View>
      <View>
        <TextInput
          ref={textInputRef}
          style={[
            styles.textInput,
            { backgroundColor: transparentize(0.85, color), color },
          ]}
          onChangeText={setInput}
          value={input ?? movie?.title}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => !input && setInput("")}
          onBlur={() => !input && setInput(undefined)}
          returnKeyType="done"
        />
        <View style={styles.inputIcon}>
          {isLoading ? (
            <ActivityIndicator />
          ) : input ?? movie?.title ? (
            <Ionicons
              color={color}
              name="close-circle-outline"
              onPress={() => {
                setInput("");
                textInputRef.current?.focus();
              }}
              size={20}
            />
          ) : null}
        </View>
      </View>
      <View>
        {movies.length > 0 && !isLoading && (
          <View style={[styles.results, { maxHeight }]}>
            <ScrollView
              contentContainerStyle={styles.resultsContent}
              keyboardShouldPersistTaps="handled"
            >
              {movies.map((movie) => (
                <Button
                  key={movie.id}
                  onPress={() => {
                    selectMovie(movie);
                    setInput(undefined);
                    textInputRef.current?.blur();
                  }}
                  title={movie.title}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputIcon: {
    alignItems: "flex-end",
    backgroundColor: colors.transparent,
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    top: 0,
  },
  results: {
    borderColor: colors.gray,
    borderWidth: 1,
    left: 0,
    overflow: "scroll",
    position: "absolute",
    right: 0,
  },
  resultsContent: { alignItems: "flex-start" },
  textInput: { paddingHorizontal: 20, paddingVertical: 16 },
});
