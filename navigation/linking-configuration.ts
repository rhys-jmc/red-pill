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
              DiscoverScreen: "discover-screen",
              MovieDetailsScreen: "movie",
            },
          },
          UpNext: {
            screens: {
              UpNextScreen: "up-next",
              MovieDetailsScreen: "movie",
            },
          },
          Watched: {
            screens: {
              WatchedScreen: "watched",
              MovieDetailsScreen: "movie",
            },
          },
          Blocked: {
            screens: {
              BlockedScreen: "blocked",
              MovieDetailsScreen: "movie",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
