import axios from "axios";
import { useState, useEffect, useMemo } from "react";

import { getPerson } from "../helpers";

import type { Person } from "../types";

export const usePerson = (
  personId?: number
): { readonly person: Person | undefined; readonly isLoading: boolean } => {
  const [person, setPerson] = useState<Person>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPerson(undefined);
    if (personId === undefined) return;
    setIsLoading(true);

    const source = axios.CancelToken.source();

    getPerson({ personId, source })
      .then((person) => {
        setPerson(person);
        setIsLoading(false);
        return person;
      })
      .catch(console.error);

    return source.cancel;
  }, [personId]);

  return useMemo(() => ({ person, isLoading }), [person, isLoading]);
};
