import axios from "axios";

import { API_URL, API_KEY_PARAM } from "../constants";

import type { MovieCredits } from "../types";
import type { CancelTokenSource } from "axios";

export const getPersonMovieCredits = async ({
  personId,
  source,
}: {
  readonly personId: number;
  readonly source: CancelTokenSource;
}): Promise<MovieCredits> =>
  (
    await axios.get<MovieCredits>(
      `${API_URL}/person/${personId}/movie_credits?${API_KEY_PARAM}`,
      { cancelToken: source.token }
    )
  ).data;
