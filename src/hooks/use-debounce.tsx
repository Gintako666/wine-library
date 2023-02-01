/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export const useDebounce = (value: any, delay: number) => {
  const [debounceValue, setdebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setdebounceValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return debounceValue;
};
