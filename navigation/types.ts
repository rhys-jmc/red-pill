/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import type { SearchMovieResult } from "../services/tmdb/types";

export type RootStackParamList = {
  readonly Root: undefined;
  readonly NotFound: undefined;
};

export type BottomTabParamList = {
  readonly TabOne: undefined;
  readonly TabTwo: undefined;
};

export type TabOneParamList = {
  readonly MovieDetailScreen: { readonly movie: SearchMovieResult };
  readonly MovieSearchScreen: undefined;
  readonly TabOneScreen: undefined;
};

export type TabTwoParamList = {
  readonly TabTwoScreen: undefined;
};
