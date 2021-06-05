import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { useBlocked } from "../../context";
import { useDebounce } from "../../hooks";

import { API_KEY_PARAM, API_URL } from "./constants";

import type { Movie, SearchMovieData } from "./types";
import type { CancelTokenSource } from "axios";

const getMovie = async ({
  movieId,
  source,
}: {
  readonly movieId: number;
  readonly source: CancelTokenSource;
}): Promise<Movie> =>
  (
    await axios.get<Movie>(`${API_URL}/movie/${movieId}?${API_KEY_PARAM}`, {
      cancelToken: source.token,
    })
  ).data;

export const useMovie = (
  movieId?: number
): { readonly movie: Movie | undefined; readonly isLoading: boolean } => {
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (movieId !== undefined) {
      setMovie(undefined);
      setIsLoading(true);
    }
  }, [movieId]);

  useEffect(() => {
    if (movieId === undefined) return;

    const source = axios.CancelToken.source();

    getMovie({ movieId, source })
      .then((movie) => {
        setMovie(movie);
        setIsLoading(false);
        return movie;
      })
      .catch(console.error);

    return source.cancel;
  }, [movieId]);

  return { movie, isLoading };
};

export const useMovies = ({
  movieIds,
  showBlocked = false,
}: {
  readonly movieIds: readonly number[];
  readonly showBlocked?: boolean;
}): { readonly movies: readonly Movie[]; readonly isLoading: boolean } => {
  const [movies, setMovies] = useState<readonly Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isBlocked } = useBlocked();

  useEffect(() => {
    setMovies([]);
    if (movieIds.length > 0) setIsLoading(true);
    else setIsLoading(false);
  }, [movieIds]);

  const loadMovies = useCallback(
    (movies: readonly Movie[]) => {
      setMovies(
        movies
          .filter((m) => showBlocked || !isBlocked(m.id))
          .sort((a, b) => a.title.localeCompare(b.title))
      );

      setIsLoading(false);
    },
    [isBlocked]
  );

  useEffect(() => {
    const items = movieIds.map((movieId) => ({
      movieId,
      source: axios.CancelToken.source(),
    }));

    Promise.all(items.map(getMovie)).then(loadMovies).catch(console.error);

    return () => {
      items.map(({ source }) => source.cancel());
    };
  }, [movieIds]);

  return { movies, isLoading };
};

type Result = SearchMovieData["results"][number];

export const useSearchMovies = (
  input: string
): { readonly movies: readonly Result[]; readonly isLoading: boolean } => {
  const query = useDebounce(input);
  const [movies, setMovies] = useState<readonly Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isBlocked } = useBlocked();

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
        setMovies(results.filter((m) => !isBlocked(m.id)));
        setIsLoading(false);
        return results;
      })
      .catch(console.error);

    return source.cancel;
  }, [query]);

  return { movies, isLoading };
};
