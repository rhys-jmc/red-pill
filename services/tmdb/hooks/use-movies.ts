import axios from "axios";
import { useState, useCallback, useEffect } from "react";

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
  const [movies, setMovies] = useState<readonly Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isBlocked } = useBlocked();

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
    setMovies([]);
    if (movieIds.length > 0) setIsLoading(true);
    else setIsLoading(false);

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
