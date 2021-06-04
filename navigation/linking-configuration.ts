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
            },
          },
          UpNext: {
            screens: {
              UpNextScreen: "up-next",
              MovieDetailsScreen: "movie",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
