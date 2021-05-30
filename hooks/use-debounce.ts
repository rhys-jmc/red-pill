import { useState, useEffect } from "react";

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrent(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, value]);

  return current;
};
