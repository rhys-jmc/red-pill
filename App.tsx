import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { loadAsync } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ContextProvier } from "./context";
import { useColorScheme } from "./hooks";
import { Navigation } from "./navigation";

const App = (): JSX.Element | null => {
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadResourcesAndDataAsync()
      .then(() => setIsLoading(false))
      .catch(console.error);
  }, []);

  return isLoading ? (
    <AppLoading />
  ) : (
    <SafeAreaProvider>
      <ContextProvier>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </ContextProvier>
    </SafeAreaProvider>
  );
};

export default App;

const loadResourcesAndDataAsync = (): Promise<void> =>
  loadAsync({
    ...Ionicons.font,
    "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
  });
