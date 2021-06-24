import {
  checkForUpdateAsync,
  fetchUpdateAsync,
  reloadAsync,
} from "expo-updates";
import { useEffect, useState } from "react";

import { reportError } from "../helpers";

import { useAppStateStatus } from "./use-app-state-status";

export const useUpdate = (): boolean => {
  const [isUpdating, setIsUpdating] = useState(false);
  const appStateStatus = useAppStateStatus();

  useEffect(() => {
    if (!__DEV__ && appStateStatus === "active")
      checkForUpdateAsync()
        .then(async (result) => {
          // eslint-disable-next-line promise/always-return
          if (result.isAvailable) {
            setIsUpdating(true);
            await fetchUpdateAsync();
            await reloadAsync();
          }
        })
        .catch(reportError);
  }, [appStateStatus]);

  return isUpdating;
};
