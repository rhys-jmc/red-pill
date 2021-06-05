import axios from "axios";

import { API_URL, API_KEY_PARAM } from "../constants";

import type { Movie } from "../types";
import type { CancelTokenSource } from "axios";

export const getMovie = async ({
  movieId,
  source,
}: {
  readonly movieId: number;
  readonly source: CancelTokenSource;
}): Promise<Movie> =>
  (
    await axios.get<Movie>(`${API_URL}/movie/${movieId}?${API_KEY_PARAM}`, {
      cancelToken: source.token,
    })
  ).data;
