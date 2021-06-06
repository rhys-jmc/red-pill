import { canOpenURL, openURL } from "expo-linking";

import { reportError } from "./report-error";

export const openUrl = (url: string): void => {
  canOpenURL(url)
    .then((willOpen) => willOpen && openURL(url))
    .catch(reportError);
};
