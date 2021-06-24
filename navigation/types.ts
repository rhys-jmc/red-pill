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
  readonly Search: undefined;
  readonly Lists: undefined;
};

export type DiscoverStackParamList = {
  readonly DiscoverScreen: undefined;
  readonly MovieDetailsScreen: { readonly movieId: number };
  readonly PersonMoviesScreen: { readonly personId: number };
};

export type SearchStackParamList = {
  readonly SearchScreen: undefined;
  readonly MovieDetailsScreen: { readonly movieId: number };
  readonly PersonMoviesScreen: { readonly personId: number };
};

export type ListsStackParamList = {
  readonly ListsScreen: undefined;
  readonly MovieDetailsScreen: { readonly movieId: number };
};
