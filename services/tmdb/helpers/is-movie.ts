import type { SearchMultiMovieResult, SearchMultiResult } from "../types";

export const isMovie = (
  result: SearchMultiResult
): result is SearchMultiMovieResult => result.media_type === "movie";
