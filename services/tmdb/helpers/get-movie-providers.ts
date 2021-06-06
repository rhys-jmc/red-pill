import axios from "axios";

import { API_KEY_PARAM, API_URL } from "../constants";

import type { ProviderData } from "../types";
import type { CancelTokenSource } from "axios";

export const getMovieProviders = async ({
  movieId,
  source,
}: {
  readonly movieId: number;
  readonly source: CancelTokenSource;
}): Promise<ProviderData> =>
  (
    await axios.get<ProviderData>(
      `${API_URL}/movie/${movieId}/watch/providers?${API_KEY_PARAM}`,
      { cancelToken: source.token }
    )
  ).data;
