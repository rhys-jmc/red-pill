import { render, waitFor } from "@testing-library/react-native";
import React from "react";

import { ColorSchemeProvider } from "../context/color-scheme";

import { MonoText } from "./styled-text";

const text = "Snapshot test!";

it(`renders correctly`, async () => {
  const { toJSON, getByText } = render(
    <ColorSchemeProvider>
      <MonoText>{text}</MonoText>
    </ColorSchemeProvider>
  );

  await waitFor(() => getByText(text).props.style.color === "light");

  expect(toJSON()).toMatchSnapshot();
});
