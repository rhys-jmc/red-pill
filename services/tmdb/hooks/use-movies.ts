import axios from "axios";
import { useState, useEffect, useMemo } from "react";

import { useBlocked } from "../../../context";
import { getMovie } from "../helpers";

import type { Movie } from "../types";

export const useMovies = ({
  movieIds,
  showBlocked = false,
}: {
  readonly movieIds: readonly number[];
  readonly showBlocked?: boolean;
}): { readonly movies: readonly Movie[]; readonly isLoading: boolean } => {
  const [_movies, setMovies] = useState<readonly Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isBlocked } = useBlocked();

  useEffect(() => {
    setMovies([]);
    if (movieIds.length > 0) setIsLoading(true);
    else setIsLoading(false);

    const items = movieIds.map((movieId) => ({
      movieId,
      source: axios.CancelToken.source(),
    }));

    Promise.all(items.map(getMovie))
      .then((movies) => {
        setMovies(movies);
        setIsLoading(false);
        return movies;
      })
      .catch(console.error);

    return () => {
      items.map(({ source }) => source.cancel());
    };
  }, [movieIds]);

  const movies = useMemo(
    () =>
      _movies
        .filter((m) => showBlocked || !isBlocked(m.id))
        .sort((a, b) => a.title.localeCompare(b.title)),
    [_movies, isBlocked]
  );

  return useMemo(() => ({ movies, isLoading }), [movies, isLoading]);
};
