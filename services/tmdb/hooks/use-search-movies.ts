import axios from "axios";
import { useState, useEffect, useMemo } from "react";

import { useBlocked, useWatched } from "../../../context";
import { reportError } from "../../../helpers";
import { useDebounce } from "../../../hooks";
import { getSearchMovies } from "../helpers";

import type { SearchMovieResult } from "../types";

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

    getSearchMovies({ query, source })
      .then(({ results }) => {
        setMovies(results);
        setIsLoading(false);
        return results;
      })
      .catch(reportError);

    return source.cancel;
  }, [query]);

  const movies = useMemo(
    () => _movies.filter((m) => !isBlocked(m.id) && !hasWatched(m.id)),
    [_movies, isBlocked, hasWatched]
  );

  return useMemo(() => ({ movies, isLoading }), [movies, isLoading]);
};
