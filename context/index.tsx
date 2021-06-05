import React from "react";

import { BlockedProvider } from "./blocked";
import { UpNextProvider } from "./up-next";
import { WatchedProvider } from "./watched";

import type { FC } from "react";

export const ContextProvier: FC = ({ children }) => (
  <BlockedProvider>
    <UpNextProvider>
      <WatchedProvider>{children}</WatchedProvider>
    </UpNextProvider>
  </BlockedProvider>
);

export { useBlocked } from "./blocked";
export { useUpNext } from "./up-next";
export { useWatched } from "./watched";
