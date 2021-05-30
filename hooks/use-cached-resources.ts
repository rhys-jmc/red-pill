import { Ionicons } from "@expo/vector-icons";
import Font from "expo-font";
import SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

import type { FontSource } from "expo-font";

export const useCachedResources = (): boolean => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const loadResourcesAndDataAsync = useCallback(
    async (fontMap: { readonly [fontFamily: string]: FontSource }) =>
      Promise.all([
        SplashScreen.preventAutoHideAsync(),
        Font.loadAsync(fontMap),
      ]),
    []
  );

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    loadResourcesAndDataAsync({
      ...Ionicons.font,
      // eslint-disable-next-line unicorn/prefer-module
      "space-mono": require("../assets/fonts/SpaceMono-regular.ttf"),
    })
      .finally(() => {
        setIsLoadingComplete(true);
        SplashScreen.hideAsync().catch(console.error);
      })
      .catch(console.error);
  }, []);

  return isLoadingComplete;
};
