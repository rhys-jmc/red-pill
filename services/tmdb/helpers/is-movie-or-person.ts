import { isMovie } from "./is-movie";
import { isPerson } from "./is-person";

import type {
  SearchMultiMovieResult,
  SearchMultiPersonResult,
  SearchMultiResult,
} from "../types";

export const isMovieOrPerson = (
  result: SearchMultiResult
): result is SearchMultiMovieResult | SearchMultiPersonResult =>
  isMovie(result) || isPerson(result);
