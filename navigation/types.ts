/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  readonly Root: undefined;
  readonly NotFound: undefined;
};

export type BottomTabParamList = {
  readonly Discover: undefined;
  readonly UpNext: undefined;
  readonly Watched: undefined;
  readonly Blocked: undefined;
};

export type DiscoverParamList = {
  readonly DiscoverScreen: undefined;
  readonly MovieDetailsScreen: { readonly movieId: number };
};

export type UpNextParamList = {
  readonly UpNextScreen: undefined;
  readonly MovieDetailsScreen: { readonly movieId: number };
};

export type WatchedParamList = {
  readonly WatchedScreen: undefined;
  readonly MovieDetailsScreen: { readonly movieId: number };
};

export type BlockedParamList = {
  readonly BlockedScreen: undefined;
  readonly MovieDetailsScreen: { readonly movieId: number };
};
