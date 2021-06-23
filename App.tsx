import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { loadAsync } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as Sentry from "sentry-expo";

import { ErrorWasThrown } from "./components";
import { ContextProvier } from "./context";
import { reportError } from "./helpers";
import { Navigation } from "./navigation";
import { persistor, store } from "./store";

Sentry.init({
  autoSessionTracking: true,
  dsn: "https://dd27779a8c404e41bd22c7d26570e545@o802597.ingest.sentry.io/5802733",
  enableInExpoDevelopment: true,
  debug: __DEV__, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      tracingOrigins: ["api.themoviedb.org"],
    }),
  ],
});

const App = (): JSX.Element | null => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResourcesAndDataAsync()
      .then(() => setIsLoading(false))
      .catch(reportError);
  }, []);

  return isLoading ? (
    <AppLoading />
  ) : (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ContextProvier>
            <Navigation />
            <StatusBar />
          </ContextProvier>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default Sentry.Native.withErrorBoundary(App, {
  fallback: ErrorWasThrown,
});

const loadResourcesAndDataAsync = (): Promise<void> =>
  loadAsync({
    ...Ionicons.font,
    "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
  });
