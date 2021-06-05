import axios from "axios";

import { API_URL, API_KEY_PARAM } from "../constants";

import type { Person } from "../types";
import type { CancelTokenSource } from "axios";

export const getPerson = async ({
  personId,
  source,
}: {
  readonly personId: number;
  readonly source: CancelTokenSource;
}): Promise<Person> =>
  (
    await axios.get<Person>(`${API_URL}/person/${personId}?${API_KEY_PARAM}`, {
      cancelToken: source.token,
    })
  ).data;
