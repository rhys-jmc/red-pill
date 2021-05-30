import { Ionicons } from "@expo/vector-icons";
import { loadAsync } from "expo-font";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

export const useCachedResources = (): boolean => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const loadResourcesAndDataAsync = useCallback(async () => {
    await preventAutoHideAsync().catch(console.error);
    await loadAsync({
      ...Ionicons.font,
      // eslint-disable-next-line unicorn/prefer-module
      "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
    }).catch(console.error);
    await hideAsync().catch(console.error);
    setIsLoadingComplete(true);
  }, []);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    loadResourcesAndDataAsync().catch(console.error);
  }, []);

  return isLoadingComplete;
};
