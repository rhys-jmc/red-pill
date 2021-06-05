import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { makeStorage } from "../services/storage";

import { useBlocked } from "./blocked";

import type { FC } from "react";

type WatchedState = {
  readonly list: readonly number[];
  readonly add: (movieId: number) => void;
  readonly remove: (movieId: number) => void;
  readonly includes: (movieId: number) => boolean;
  readonly toggle: (movieId: number) => void;
};

const WatchedContext = createContext<WatchedState | undefined>(undefined);

const initial: readonly number[] = [];
const storage = makeStorage("watched", { list: initial });

export const WatchedProvider: FC = ({ children }) => {
  const [_list, setList] = useState<readonly number[]>([]);
  const { isBlocked } = useBlocked();
  const list = _list.filter((id) => !isBlocked(id));

  useEffect(() => {
    storage
      .get()
      .then(({ list }) => setList(list))
      .catch(console.error);
  }, []);

  useEffect(() => {
    storage.set({ list: _list }).catch(console.error);
  }, [_list]);

  const add = useCallback(
    (movieId: number) => setList((prev) => [...prev, movieId]),
    []
  );

  const remove = useCallback(
    (movieId: number) => setList((prev) => prev.filter((id) => id !== movieId)),
    []
  );

  const includes = useCallback(
    (movieId: number) => list.includes(movieId),
    [list]
  );

  const toggle = useCallback(
    (movieId: number) => (includes(movieId) ? remove(movieId) : add(movieId)),
    [add, includes, remove]
  );

  const value = useMemo(
    () => ({ list, add, remove, includes, toggle }),
    [add, list, remove, includes, toggle]
  );

  return (
    <WatchedContext.Provider value={value}>{children}</WatchedContext.Provider>
  );
};

export const useWatched = (): WatchedState => {
  const context = useContext(WatchedContext);

  if (!context)
    throw new Error("useWatched must be used within WatchedProvider");

  return context;
};
