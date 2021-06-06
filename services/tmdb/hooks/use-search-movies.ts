import axios from "axios";
import { useState, useEffect, useMemo } from "react";

import { useBlocked, useWatched } from "../../../context";
import { useDebounce } from "../../../hooks";
import { API_URL, API_KEY_PARAM } from "../constants";

import type { SearchMovieData, SearchMovieResult } from "../types";

export const useSearchMovies = (
  input: string
): {
  readonly movies: readonly SearchMovieResult[];
  readonly isLoading: boolean;
} => {
  const query = useDebounce(input);
  const [_movies, setMovies] = useState<readonly SearchMovieResult[]>([]);
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
      .get<SearchMovieData>(
        `${API_URL}/search/movie?query=${encodeURIComponent(
          query
        )}&${API_KEY_PARAM}`,
        { cancelToken: source.token }
      )
      .then(({ data: { results } }) => {
        setMovies(results);
        setIsLoading(false);
        return results;
      })
      .catch(console.error);

    return source.cancel;
  }, [query]);

  const movies = useMemo(
    () => _movies.filter((m) => !isBlocked(m.id) && !hasWatched(m.id)),
    [_movies, isBlocked, hasWatched]
  );

  return useMemo(() => ({ movies, isLoading }), [movies, isLoading]);
};
