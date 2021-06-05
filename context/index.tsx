import React from "react";

import { UpNextProvider } from "./up-next";
import { WatchedProvider } from "./watched";

import type { FC } from "react";

export const ContextProvier: FC = ({ children }) => (
  <UpNextProvider>
    <WatchedProvider>{children}</WatchedProvider>
  </UpNextProvider>
);

export { useUpNext } from "./up-next";
export { useWatched } from "./watched";
