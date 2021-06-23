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
          Discover: {
            screens: {
              DiscoverScreen: "discover",
              MovieDetailsScreen: {
                path: "discover/movie/:movieId",
                parse: { movieId: Number },
              },
              PersonMoviesScreen: {
                path: "discover/person/:personId",
                parse: { movieId: Number },
              },
            },
          },
          UpNext: {
            screens: {
              UpNextScreen: "up-next",
              MovieDetailsScreen: {
                path: "up-next/movie/:movieId",
                parse: { movieId: Number },
              },
            },
          },
          Watched: {
            screens: {
              WatchedScreen: "watched",
              MovieDetailsScreen: {
                path: "watched/movie/:movieId",
                parse: { movieId: Number },
              },
            },
          },
          Blocked: {
            screens: {
              BlockedScreen: "blocked",
              MovieDetailsScreen: {
                path: "blocked/movie/:movieId",
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
