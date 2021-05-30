import { useWindowDimensions } from "react-native";

import type { ScaledSize } from "react-native";

export const useLayout = (): {
  readonly window: ScaledSize;
  readonly isSmallDevice: boolean;
} => {
  const window = useWindowDimensions();

  return { window, isSmallDevice: window.width < 375 };
};
