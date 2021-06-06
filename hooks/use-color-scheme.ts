import { useEffect, useState } from "react";
import { useColorScheme as _useColorScheme } from "react-native";

import { reportError } from "../helpers";
import { makeStorage } from "../services/storage";

import type { ColorSchemeName } from "react-native";

const inital = "light" as NonNullable<ColorSchemeName>;
const storage = makeStorage("color-scheme", { scheme: inital });

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export const useColorScheme = (): NonNullable<ColorSchemeName> => {
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

  return _scheme ?? savedScheme ?? "light";
};
