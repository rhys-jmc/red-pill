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
};

export type DiscoverParamList = { readonly DiscoverScreen: undefined };

export type UpNextParamList = {
  readonly UpNextScreen: undefined;
  readonly MovieDetailsScreen: { readonly movieId: number };
};
