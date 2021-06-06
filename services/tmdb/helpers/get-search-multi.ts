import axios from "axios";

import { API_KEY_PARAM, API_URL } from "../constants";

import type { SearchMultiData } from "../types";
import type { CancelTokenSource } from "axios";

export const getSearchMulti = async ({
  query,
  source,
}: {
  readonly query: string;
  readonly source: CancelTokenSource;
}): Promise<SearchMultiData> =>
  (
    await axios.get<SearchMultiData>(
      `${API_URL}/search/multi?query=${encodeURIComponent(
        query
      )}&${API_KEY_PARAM}`,
      { cancelToken: source.token }
    )
  ).data;
