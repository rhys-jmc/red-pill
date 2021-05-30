import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useCachedResources } from "./hooks/use-cached-resources";
import { useColorScheme } from "./hooks/use-color-scheme";
import { Navigation } from "./navigation";

const App = (): JSX.Element | null => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  return !isLoadingComplete ? null : (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
