import { render, waitFor } from "@testing-library/react-native";
import React from "react";

import { MonoText } from "./styled-text";

const text = "Snapshot test!";
it(`renders correctly`, async () => {
  const { toJSON, getByText } = render(<MonoText>{text}</MonoText>);

  await waitFor(() => getByText(text).props.style.color === "light");

  expect(toJSON()).toMatchSnapshot();
});
