import { useEffect, useState } from "react";
import { AppState } from "react-native";

import type { AppStateStatus } from "react-native";

export const useAppStateStatus = (): AppStateStatus => {
  const [appStateStatus, setAppStateStatus] = useState(AppState.currentState);

  useEffect(() => {
    const listener = (state: AppStateStatus): void => setAppStateStatus(state);

    AppState.addEventListener("change", listener);

    return () => AppState.removeEventListener("change", listener);
  }, []);

  return appStateStatus;
};
