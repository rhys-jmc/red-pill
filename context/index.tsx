import React from "react";

import { BlockedProvider } from "./blocked";
import { ColorSchemeProvider } from "./color-scheme";
import { UpNextProvider } from "./up-next";
import { WatchedProvider } from "./watched";

import type { FC } from "react";

export const ContextProvier: FC = ({ children }) => (
  <ColorSchemeProvider>
    <BlockedProvider>
      <UpNextProvider>
        <WatchedProvider>{children}</WatchedProvider>
      </UpNextProvider>
    </BlockedProvider>
  </ColorSchemeProvider>
);

export { useBlocked } from "./blocked";
export { useColorScheme } from "./color-scheme";
export { useUpNext } from "./up-next";
export { useWatched } from "./watched";
