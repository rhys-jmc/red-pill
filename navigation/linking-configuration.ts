/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { makeUrl } from "expo-linking";

import type { LinkingOptions } from "@react-navigation/native";

export const LinkingConfiguration: LinkingOptions = {
  prefixes: [makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Search: {
            screens: {
              SearchScreen: "search",
              MovieDetailsScreen: {
                path: "search/movie/:movieId",
                parse: { movieId: Number },
              },
              PersonMoviesScreen: {
                path: "search/person/:personId",
                parse: { movieId: Number },
              },
            },
          },
          Lists: {
            screens: {
              ListsScreen: "lists",
              MovieDetailsScreen: {
                path: "lists/movie/:movieId",
                parse: { movieId: Number },
              },
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
