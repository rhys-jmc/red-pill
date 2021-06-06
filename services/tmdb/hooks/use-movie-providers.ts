import axios from "axios";
import { useState, useEffect, useMemo } from "react";

import { getMovieProviders } from "../helpers";

import type { ProviderMap } from "../types";

export const useMovieProviders = (
  movieId?: number
): {
  readonly providerMap: Omit<ProviderMap, "link"> | undefined;
  readonly isLoading: boolean;
} => {
  const [providerMap, setProviderMap] = useState<Omit<ProviderMap, "link">>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProviderMap(undefined);
    if (movieId === undefined) return;
    setIsLoading(true);

    const source = axios.CancelToken.source();

    getMovieProviders({ movieId, source })
      .then(({ results: { AU } }) => {
        setProviderMap({
          buy: AU?.buy,
          flatrate: AU?.flatrate,
          rent: AU?.rent,
        });
        setIsLoading(false);
        return AU;
      })
      .catch(console.error);

    return source.cancel;
  }, [movieId]);

  return useMemo(() => ({ providerMap, isLoading }), [providerMap, isLoading]);
};
