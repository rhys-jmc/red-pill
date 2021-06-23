import React from "react";

import { ColorSchemeProvider } from "./color-scheme";

import type { FC } from "react";

export const ContextProvier: FC = ({ children }) => (
  <ColorSchemeProvider>{children}</ColorSchemeProvider>
);

export { useColorScheme } from "./color-scheme";
