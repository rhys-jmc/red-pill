import { createSlice } from "@reduxjs/toolkit";

import type { ListCategory } from "../services/tmdb";
import type { PayloadAction } from "@reduxjs/toolkit";

type State = Record<
  number,
  Partial<Record<ListCategory, boolean>> & { readonly movieId: number }
>;

export const movieSlice = createSlice({
  name: "movies",
  initialState: {} as State,
  reducers: {
    toggle: (
      state,
      action: PayloadAction<{
        readonly movieId: number;
        readonly category: ListCategory;
        readonly override?: boolean;
      }>
    ): State => ({
      ...state,
      [action.payload.movieId]: {
        ...state[action.payload.movieId],
        movieId: action.payload.movieId,
        [action.payload.category]:
          action.payload.override ??
          !state[action.payload.movieId]?.[action.payload.category] ??
          true,
      },
    }),
  },
});

export const { toggle: toggleMovieList } = movieSlice.actions;
