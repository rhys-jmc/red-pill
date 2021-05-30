import { render } from "@testing-library/react-native";
import React from "react";

import { MonoText } from "./styled-text";

it(`renders correctly`, () => {
  const { toJSON } = render(<MonoText>Snapshot test!</MonoText>);

  expect(toJSON()).toMatchSnapshot();
});
