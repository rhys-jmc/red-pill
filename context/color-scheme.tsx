import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme as _useColorScheme } from "react-native";

import { reportError } from "../helpers";
import { makeStorage } from "../services/storage";

import type { FC } from "react";
import type { ColorSchemeName } from "react-native";

const UpNextContext = createContext<typeof initial | undefined>(undefined);
const initial = "light" as NonNullable<ColorSchemeName>;
const storage = makeStorage("color-scheme", { scheme: initial });

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export const ColorSchemeProvider: FC = ({ children }) => {
  const _scheme = _useColorScheme();
  const [savedScheme, setSavedScheme] =
    useState<NonNullable<ColorSchemeName>>();

  useEffect(() => {
    storage
      .get()
      .then(({ scheme }) => setSavedScheme(scheme))
      .catch(reportError);
  }, []);

  useEffect(() => {
    if (_scheme) storage.set({ scheme: _scheme });
  }, [_scheme]);

  const value = useMemo(
    () => _scheme ?? savedScheme ?? "light",
    [_scheme, savedScheme]
  );

  return (
    <UpNextContext.Provider value={value}>{children}</UpNextContext.Provider>
  );
};

export const useColorScheme = (): typeof initial => {
  const context = useContext(UpNextContext);

  if (!context) throw new Error("useUpNext must be used within UpNextProvider");

  return context;
};
