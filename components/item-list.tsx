import equal from "fast-deep-equal";
import React, { memo, useMemo } from "react";
import { FlatList, StyleSheet, TouchableHighlight } from "react-native";

import { isMovie } from "../services/tmdb";

import { BlockedButton } from "./blocked-button";
import { Poster } from "./poster";
import { ThemedText, ThemedView } from "./themed";
import { UpNextButton } from "./up-next-button";
import { WatchedButton } from "./watched-button";

import type {
  SearchMultiMovieResult,
  SearchMultiPersonResult,
} from "../services/tmdb";

type ItemProps = {
  readonly items: readonly (SearchMultiMovieResult | SearchMultiPersonResult)[];
  readonly selectItem: (item: {
    readonly id: number;
    readonly media_type: "movie" | "person";
  }) => void;
};

type Datum = {
  readonly id: number;
  readonly media_type: "movie" | "person";
  readonly path: string | null;
  readonly variant: "poster" | "profile";
  readonly title: string;
  readonly subtitle: string | undefined;
  readonly onPress: () => void;
};

const toDatum =
  (selectItem: ItemProps["selectItem"]) =>
  (item: ItemProps["items"][number]): Datum => ({
    id: item.id,
    media_type: item.media_type,
    onPress: () => selectItem(item),
    path: item.media_type === "movie" ? item.poster_path : item.profile_path,
    variant: item.media_type === "movie" ? "poster" : "profile",
    title: item.media_type === "movie" ? item.title : item.name,
    subtitle:
      item.media_type === "movie"
        ? item.release_date &&
          new Date(item.release_date).getFullYear().toFixed()
        : item.known_for
            .filter(isMovie)
            .map((m) => m.title)
            .join(", "),
  });

const renderItem = ({ item }: { readonly item: Datum }): JSX.Element => (
  <TouchableHighlight
    key={`${item.media_type}-${item.id}`}
    onPress={item.onPress}
    style={styles.resultContainer}
  >
    <ThemedView style={styles.result}>
      <Poster
        path={item.path}
        height={styles.result.height}
        variant={item.media_type === "movie" ? "poster" : "profile"}
      />
      <ThemedView style={styles.resultDetails}>
        <ThemedText numberOfLines={1} style={styles.title}>
          {item.title}
        </ThemedText>
        <ThemedText numberOfLines={1} style={styles.year}>
          {item.subtitle}
        </ThemedText>
        {item.media_type === "movie" && (
          <>
            <UpNextButton movieId={item.id} />
            <ThemedView style={styles.buttons}>
              <WatchedButton movieId={item.id} />
              <BlockedButton movieId={item.id} />
            </ThemedView>
          </>
        )}
      </ThemedView>
    </ThemedView>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttons: { flexDirection: "row" },
  fill: { flex: 1 },
  result: {
    flexDirection: "row",
    height: 140,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  resultContainer: { marginTop: 20 },
  resultDetails: {
    alignItems: "flex-start",
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  results: { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  resultsContent: { alignItems: "stretch", paddingBottom: 20 },
  title: { fontSize: 20, fontWeight: "500" },
  year: { fontSize: 16 },
});

const itemHeight = styles.result.height + styles.resultContainer.marginTop;

const getItemLayout = (
  _: unknown,
  index: number
): {
  readonly length: number;
  readonly offset: number;
  readonly index: number;
} => ({
  length: itemHeight,
  offset: itemHeight * index,
  index,
});

const keyExtractor = (datum: Datum): string =>
  `${datum.media_type}-${datum.id}`;

const MemoItemList = ({ items, selectItem }: ItemProps): JSX.Element => {
  const data = useMemo(
    () => items.map(toDatum(selectItem)),
    [items, selectItem]
  );

  return (
    <ThemedView style={styles.fill}>
      <FlatList
        contentContainerStyle={styles.resultsContent}
        keyboardShouldPersistTaps="handled"
        style={styles.results}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        removeClippedSubviews
        initialNumToRender={5}
        windowSize={5 * 2 + 1}
        getItemLayout={getItemLayout}
      />
    </ThemedView>
  );
};

export const ItemList = memo(MemoItemList, equal);
