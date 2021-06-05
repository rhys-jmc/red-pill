import { canOpenURL, openURL } from "expo-linking";

export const openUrl = (url: string): void => {
  canOpenURL(url)
    .then((willOpen) => willOpen && openURL(url))
    .catch(console.error);
};
