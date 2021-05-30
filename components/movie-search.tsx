import { Ionicons } from "@expo/vector-icons";
import { transparentize } from "polished";
import React, { useRef, useState } from "react";
import {
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  TouchableHighlight,
} from "react-native";

import { useThemeColor } from "../hooks";
import { getTmdbImageUri, useSearchMovies } from "../services/tmdb";

import { ThemedText, ThemedView } from "./themed";

import type { SearchMovieResult } from "../services/tmdb";
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
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { movies, isLoading } = useSearchMovies(input ?? "");
  const color = useThemeColor({}, "text");
  const focusTextInput = (): void => textInputRef.current?.focus();
  const shouldShowPlaceholder = !isFocused && !movie?.title;
  const shouldShowResults = movies.length > 0 && !isLoading;
  const shouldShowClearIcon =
    Boolean(isFocused && input) || Boolean(!isFocused && movie?.title);

  return (
    <View style={{ backgroundColor: transparentize(0.85, color) }}>
      <View>
        <TextInput
          ref={textInputRef}
          style={[styles.textInput, { color }]}
          onChangeText={setInput}
          value={isFocused ? input : movie?.title}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="done"
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
      </View>
      {isFocused && (
        <View>
          {shouldShowResults && (
            <View
              style={[
                styles.resultsContainer,
                { borderColor: color, maxHeight },
              ]}
            >
              <ScrollView
                contentContainerStyle={styles.resultsContent}
                keyboardShouldPersistTaps="handled"
                style={styles.results}
              >
                {movies.map((movie) => (
                  <TouchableHighlight
                    key={movie.id}
                    onPress={() => {
                      selectMovie(movie);
                      setInput("");
                      textInputRef.current?.blur();
                    }}
                  >
                    <ThemedView>
                      <ImageBackground
                        source={{
                          uri: getTmdbImageUri(
                            movie.backdrop_path ?? "",
                            "backdrop"
                          ),
                        }}
                        resizeMode="cover"
                        imageStyle={{ opacity: 1 - 0.618 }}
                        style={styles.result}
                      >
                        <ThemedText numberOfLines={1} style={styles.title}>
                          {movie.title}
                          {movie.release_date &&
                            ` (${new Date(movie.release_date).getFullYear()})`}
                        </ThemedText>
                      </ImageBackground>
                    </ThemedView>
                  </TouchableHighlight>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    alignItems: "center",
    flexDirection: "row",
    height: 48,
    paddingHorizontal: 20,
  },
  results: { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  resultsContainer: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 0,
    borderWidth: 1,
    left: -1,
    position: "absolute",
    right: -1,
  },
  resultsContent: { alignItems: "stretch" },
  textInput: {
    fontSize: 16,
    marginLeft: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: { fontSize: 16 },
});
