import axios from "axios";

import { API_KEY_PARAM, API_URL } from "../constants";

import type { SearchMovieData } from "../types";
import type { CancelTokenSource } from "axios";

export const getSearchMovies = async ({
  query,
  source,
}: {
  readonly query: string;
  readonly source: CancelTokenSource;
}): Promise<SearchMovieData> =>
  (
    await axios.get<SearchMovieData>(
      `${API_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&${API_KEY_PARAM}`,
      { cancelToken: source.token }
    )
  ).data;
