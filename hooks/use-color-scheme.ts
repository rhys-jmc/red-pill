import { useEffect, useState } from "react";
import { useColorScheme as _useColorScheme } from "react-native";

import { makeStorage } from "../services/storage";

import type { ColorSchemeName } from "react-native";

const inital = "light" as NonNullable<ColorSchemeName>;
const storage = makeStorage("color-scheme", { scheme: inital });

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export const useColorScheme = (): NonNullable<ColorSchemeName> => {
  const [scheme, setScheme] = useState<NonNullable<ColorSchemeName>>(inital);
  const _scheme = _useColorScheme();

  useEffect(() => {
    storage
      .get()
      .then((x) => setScheme(x.scheme))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (_scheme) setScheme(_scheme);
  }, [_scheme]);

  useEffect(() => {
    storage.set({ scheme }).catch(console.error);
  }, [scheme]);

  return scheme;
};
