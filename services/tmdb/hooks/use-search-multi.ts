import axios from "axios";
import { useState, useEffect } from "react";

import { useBlocked, useWatched } from "../../../context";
import { useDebounce } from "../../../hooks";
import { API_URL, API_KEY_PARAM } from "../constants";

import type {
  SearchMultiData,
  SearchMultiMovieResult,
  SearchMultiPersonResult,
  SearchMultiResult,
} from "../types";

export const useSearchMulti = (
  input: string
): {
  readonly movies: readonly SearchMultiMovieResult[];
  readonly isLoading: boolean;
} => {
  const query = useDebounce(input);
  const [movies, setMovies] = useState<readonly SearchMultiMovieResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isBlocked } = useBlocked();
  const { hasWatched } = useWatched();

  useEffect(() => {
    setMovies([]);
    if (input) setIsLoading(true);
    else setIsLoading(false);
  }, [input]);

  useEffect(() => {
    if (!query) return;

    const source = axios.CancelToken.source();

    axios
      .get<SearchMultiData>(
        `${API_URL}/search/multi?query=${encodeURIComponent(
          input
        )}&${API_KEY_PARAM}`,
        { cancelToken: source.token }
      )
      .then(({ data: { results } }) => {
        const movies = results
          .filter(isMovieOrPerson)
          .flatMap((r) => (isMovie(r) ? r : r.known_for.filter(isMovie)));
        setMovies(movies);
        setIsLoading(false);
        return results;
      })
      .catch(console.error);

    return source.cancel;
  }, [query]);

  return {
    movies: movies.filter((m) => !isBlocked(m.id) && !hasWatched(m.id)),
    isLoading,
  };
};

const isMovieOrPerson = (
  result: SearchMultiResult
): result is SearchMultiMovieResult | SearchMultiPersonResult =>
  isMovie(result) || isPerson(result);

const isMovie = (result: SearchMultiResult): result is SearchMultiMovieResult =>
  result.media_type === "movie";

const isPerson = (
  result: SearchMultiResult
): result is SearchMultiPersonResult => result.media_type === "person";
