import { Ionicons } from "@expo/vector-icons";
import { transparentize } from "polished";
import React, { useRef, useState } from "react";
import {
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
} from "react-native";

import { useThemeColor } from "../hooks";
import { useSearchMovies } from "../services/tmdb";

import { BlockedButton } from "./blocked-button";
import { Poster } from "./poster";
import { ThemedText, ThemedView } from "./themed";
import { UpNextButton } from "./up-next-button";
import { WatchedButton } from "./watched-button";

import type { SearchMovieResult } from "../services/tmdb";

export const MovieSearch = ({
  selectMovie,
}: {
  readonly selectMovie: (movie: SearchMovieResult) => void;
}): JSX.Element => {
  const textInputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { movies, isLoading } = useSearchMovies(input);
  const color = useThemeColor({}, "text");
  const focusTextInput = (): void => textInputRef.current?.focus();
  const shouldShowPlaceholder = !isFocused && !input;
  const shouldShowResults = !isLoading;
  const shouldShowClearIcon = Boolean(input);

  return (
    <ThemedView>
      <ThemedView style={{ backgroundColor: transparentize(0.85, color) }}>
        <TextInput
          ref={textInputRef}
          style={[styles.textInput, { color }]}
          onChangeText={setInput}
          value={input}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="search"
        />
        <View style={styles.inputIconLeft}>
          <Ionicons color={color} name="search-outline" size={20} />
        </View>
        {shouldShowPlaceholder && (
          <ThemedText onPress={focusTextInput} style={styles.inputPlaceHolder}>
            {"Search the rabbit hole"}
          </ThemedText>
        )}
        <View style={styles.inputIconRight}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            shouldShowClearIcon && (
              <Ionicons
                color={color}
                name="close-circle-outline"
                onPress={() => {
                  setInput("");
                  focusTextInput();
                }}
                size={20}
              />
            )
          )}
        </View>
      </ThemedView>
      {shouldShowResults && (
        <ScrollView
          contentContainerStyle={styles.resultsContent}
          keyboardShouldPersistTaps="handled"
          style={styles.results}
        >
          {movies.map((movie) => (
            <TouchableHighlight
              key={movie.id}
              onPress={() => selectMovie(movie)}
            >
              <ThemedView style={styles.result}>
                <Poster
                  path={movie.poster_path ?? ""}
                  height={styles.result.height}
                />
                <ThemedView style={styles.resultDetails}>
                  <ThemedText numberOfLines={1} style={styles.title}>
                    {movie.title}
                  </ThemedText>
                  <ThemedText style={styles.year}>
                    {movie.release_date &&
                      new Date(movie.release_date).getFullYear()}
                  </ThemedText>
                  <UpNextButton movieId={movie.id} />
                  <ThemedView style={styles.buttons}>
                    <WatchedButton movieId={movie.id} />
                    <BlockedButton movieId={movie.id} />
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            </TouchableHighlight>
          ))}
        </ScrollView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  buttons: { flexDirection: "row" },
  inputIconLeft: {
    bottom: 0,
    justifyContent: "center",
    left: 20,
    position: "absolute",
    top: 0,
  },
  inputIconRight: {
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    top: 0,
  },
  inputPlaceHolder: {
    fontSize: 16,
    left: 50,
    opacity: 0.618,
    position: "absolute",
    top: 16,
  },
  result: {
    flexDirection: "row",
    height: 140,
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  resultDetails: {
    alignItems: "flex-start",
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  results: { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  resultsContent: { alignItems: "stretch" },
  textInput: {
    fontSize: 16,
    marginLeft: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: { fontSize: 20, fontWeight: "500" },
  year: { fontSize: 16 },
});
