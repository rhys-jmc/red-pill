import axios from "axios";
import { useState, useEffect, useMemo } from "react";

import { useBlocked, useWatched } from "../../../context";
import { reportError } from "../../../helpers";
import { useDebounce } from "../../../hooks";
import { isMovie, getSearchMulti } from "../helpers";

import type {
  SearchMultiMovieResult,
  SearchMultiPersonResult,
  SearchMultiResult,
} from "../types";

export const useSearchMulti = (
  input: string
): {
  readonly items: readonly (SearchMultiMovieResult | SearchMultiPersonResult)[];
  readonly isLoading: boolean;
} => {
  const query = useDebounce(input);
  const [isLoading, setIsLoading] = useState(false);
  const { isBlocked } = useBlocked();
  const { hasWatched } = useWatched();
  const [_items, setItems] = useState<
    readonly (SearchMultiMovieResult | SearchMultiPersonResult)[]
  >([]);

  useEffect(() => {
    setItems([]);
    if (input) setIsLoading(true);
    else setIsLoading(false);
  }, [input]);

  useEffect(() => {
    if (!query) return;

    const source = axios.CancelToken.source();

    getSearchMulti({ query, source })
      .then(({ results }) => {
        setItems(results.filter(isMovieOrPerson));
        setIsLoading(false);
        return results;
      })
      .catch(reportError);

    return source.cancel;
  }, [query]);

  const items = useMemo(
    () => _items.filter((m) => !isBlocked(m.id) && !hasWatched(m.id)),
    [_items, isBlocked, hasWatched]
  );

  return useMemo(() => ({ items, isLoading }), [items, isLoading]);
};

const isMovieOrPerson = (
  result: SearchMultiResult
): result is SearchMultiMovieResult | SearchMultiPersonResult =>
  isMovie(result) || isPerson(result);

const isPerson = (
  result: SearchMultiResult
): result is SearchMultiPersonResult => result.media_type === "person";
