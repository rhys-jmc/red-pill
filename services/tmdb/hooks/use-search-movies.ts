import axios from "axios";
import { useState, useEffect } from "react";

import { useBlocked, useWatched } from "../../../context";
import { useDebounce } from "../../../hooks";
import { API_URL, API_KEY_PARAM } from "../constants";

import type { SearchMovieData } from "../types";

type Result = SearchMovieData["results"][number];

export const useSearchMovies = (
  input: string
): { readonly movies: readonly Result[]; readonly isLoading: boolean } => {
  const query = useDebounce(input);
  const [movies, setMovies] = useState<readonly Result[]>([]);
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
          input
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

  return {
    movies: movies.filter((m) => !isBlocked(m.id) && !hasWatched(m.id)),
    isLoading,
  };
};
