import axios from "axios";
import { useState, useEffect, useMemo } from "react";

import { useBlocked, useWatched } from "../../../context";
import { reportError } from "../../../helpers";
import { getPersonMovieCredits } from "../helpers";

import type { MovieCredits } from "../types";

export const usePersonMovieCredits = (
  personId?: number
): {
  readonly movieCredits: MovieCredits | undefined;
  readonly isLoading: boolean;
} => {
  const [_movieCredits, setMovieCredits] = useState<MovieCredits>();
  const [isLoading, setIsLoading] = useState(false);
  const { isBlocked } = useBlocked();
  const { hasWatched } = useWatched();

  useEffect(() => {
    setMovieCredits(undefined);
    if (personId === undefined) return;
    setIsLoading(true);

    const source = axios.CancelToken.source();

    getPersonMovieCredits({ personId, source })
      .then((movieCredits) => {
        setMovieCredits(movieCredits);
        setIsLoading(false);
        return movieCredits;
      })
      .catch(reportError);

    return source.cancel;
  }, [personId]);

  const movieCredits: MovieCredits | undefined = useMemo(
    () =>
      _movieCredits && {
        id: _movieCredits.id,
        cast: _movieCredits.cast.filter(
          (m) => !isBlocked(m.id) && !hasWatched(m.id)
        ),
        crew: _movieCredits.crew.filter(
          (m) => !isBlocked(m.id) && !hasWatched(m.id)
        ),
      },
    [_movieCredits, isBlocked, hasWatched]
  );

  return useMemo(
    () => ({ movieCredits, isLoading }),
    [movieCredits, isLoading]
  );
};
