import { useDispatch } from "react-redux";

import type { AppDispatch } from "../store";

// Use throughout your app instead of plain `useDispatch`
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
