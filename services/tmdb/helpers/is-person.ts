import type { SearchMultiPersonResult, SearchMultiResult } from "../types";

export const isPerson = (
  result: SearchMultiResult
): result is SearchMultiPersonResult => result.media_type === "person";
