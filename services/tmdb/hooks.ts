import axios from "axios";
import { useEffect, useState } from "react";

import { useDebounce } from "../../hooks";

import { API_KEY_PARAM, API_URL } from "./constants";

import type { Movie, SearchMovieData } from "./types";
import type { CancelTokenSource } from "axios";

export const useMovie = (
  movieId?: number
): { readonly movie: Movie | undefined; readonly isLoading: boolean } => {
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (movieId !== undefined) setIsLoading(true);
  }, [movieId]);

  useEffect(() => {
    if (movieId === undefined) return;

    const source = axios.CancelToken.source();

    setIsLoading(true);

    axios
      .get<Movie>(`${API_URL}/movie/${movieId}?${API_KEY_PARAM}`)
      .then(({ data }) => {
        setMovie(data);
        setIsLoading(false);
        return data;
      })
      .catch(console.error);

    return () => cancelQuery(source, setIsLoading);
  }, [movieId]);

  return { movie, isLoading };
};

type Result = SearchMovieData["results"][number];

export const useSearchMovies = (
  input: string
): { readonly movies: readonly Result[]; readonly isLoading: boolean } => {
  const query = useDebounce(input);
  const [movies, setMovies] = useState<readonly Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (input) setIsLoading(true);
    else {
      setIsLoading(false);
      setMovies([]);
    }
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

    return () => cancelQuery(source, setIsLoading);
  }, [query]);

  return { movies, isLoading };
};

const cancelQuery = (
  source: CancelTokenSource,
  setIsLoading: (isLoading: boolean) => void
): void => {
  source.cancel();
  setIsLoading(false);
};
