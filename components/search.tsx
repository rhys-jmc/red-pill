import { Ionicons } from "@expo/vector-icons";
import { transparentize } from "polished";
import React, { useRef, useState } from "react";
import { TextInput, ActivityIndicator, StyleSheet, View } from "react-native";

import { useThemeColor } from "../hooks";
import { useSearchMulti } from "../services/tmdb";

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
  const { items, isLoading } = useSearchMulti(input);
  const color = useThemeColor({}, "text");
  const focusTextInput = (): void => textInputRef.current?.focus();
  const shouldShowPlaceholder = !isFocused && !input;
  const shouldShowResults = items.length > 0 && !isLoading;
  const shouldShowClearIcon = Boolean(input);

  return (
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
      {shouldShowResults && <ItemList {...{ items, selectItem }} />}
    </ThemedView>
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
