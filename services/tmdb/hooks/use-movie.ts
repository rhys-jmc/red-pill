import axios from "axios";
import { useState, useEffect, useMemo } from "react";

import { getMovie } from "../helpers";

import type { Movie } from "../types";

export const useMovie = (
  movieId?: number
): { readonly movie: Movie | undefined; readonly isLoading: boolean } => {
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMovie(undefined);
    if (movieId === undefined) return;
    setIsLoading(true);

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

  return useMemo(() => ({ movie, isLoading }), [movie, isLoading]);
};
