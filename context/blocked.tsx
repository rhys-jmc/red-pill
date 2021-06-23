import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { reportError } from "../helpers";
import { makeStorage } from "../services/storage";

import type { FC } from "react";

type BlockedState = {
  readonly list: readonly number[];
  readonly add: (movieId: number) => void;
  readonly remove: (movieId: number) => void;
  readonly isBlocked: (movieId: number) => boolean;
  readonly toggle: (movieId: number) => void;
};

const BlockedContext = createContext<BlockedState | undefined>(undefined);

const initial: readonly number[] = [];
const storage = makeStorage("blocked", { list: initial });

export const BlockedProvider: FC = ({ children }) => {
  const [list, setList] = useState<readonly number[]>();

  useEffect(() => {
    storage
      .get()
      .then(({ list }) => setList(list))
      .catch(reportError);
  }, []);

  useEffect(() => {
    if (list) storage.set({ list });
  }, [list]);

  const add = useCallback(
    (movieId: number) => setList((prev = []) => [...prev, movieId]),
    []
  );

  const remove = useCallback(
    (movieId: number) =>
      setList((prev = []) => prev.filter((id) => id !== movieId)),
    []
  );

  const isBlocked = useCallback(
    (movieId: number) => Boolean(list?.includes(movieId)),
    [list]
  );

  const toggle = useCallback(
    (movieId: number) => (isBlocked(movieId) ? remove(movieId) : add(movieId)),
    [add, isBlocked, remove]
  );

  const value = useMemo(
    () => ({ list: list ?? [], add, remove, isBlocked, toggle }),
    [add, list, remove, isBlocked, toggle]
  );

  return (
    <BlockedContext.Provider value={value}>{children}</BlockedContext.Provider>
  );
};

export const useBlocked = (): BlockedState => {
  const context = useContext(BlockedContext);

  if (!context)
    throw new Error("useBlocked must be used within BlockedProvider");

  return context;
};
