import { Ionicons } from "@expo/vector-icons";
import { transparentize } from "polished";
import React, { useRef, useState } from "react";
import {
  TextInput,
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";

import { useDebounce, useThemeColor } from "../hooks";
import { useSearchMulti } from "../services/tmdb";
import { isMovieOrPerson } from "../services/tmdb/helpers";

import { ItemList } from "./item-list";
import { ThemedText, ThemedView } from "./themed";

import type { ComponentProps } from "react";

export const Search = ({
  selectItem,
}: {
  readonly selectItem: ComponentProps<typeof ItemList>["selectItem"];
}): JSX.Element => {
  const textInputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { data, isLoading } = useSearchMulti(input);
  // const items = data?.results.filter(isMovieOrPerson) ?? [];
  const color = useThemeColor({}, "text");
  const blurTextInput = (): void => textInputRef.current?.blur();
  const focusTextInput = (): void => textInputRef.current?.focus();
  const shouldShowPlaceholder = !isFocused && !input;
  const shouldShowClearIcon = Boolean(input);
  const items = useDebounce(data?.results.filter(isMovieOrPerson) ?? []);

  return (
    <TouchableWithoutFeedback onPressIn={blurTextInput} accessible={false}>
      <ThemedView style={styles.fill}>
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
            <ThemedText
              onPress={focusTextInput}
              style={styles.inputPlaceHolder}
            >
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
        <ItemList {...{ items: isLoading ? [] : items, selectItem }} />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
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
  textInput: {
    fontSize: 16,
    marginLeft: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
