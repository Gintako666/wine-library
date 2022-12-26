/* eslint-disable no-console */
import { useState, useLayoutEffect } from 'react';

type Theme = 'dark' | 'light';

export const useTheme = () => {
  /* const [theme, setTheme] = useState<Theme>((window
    .matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'); */
  const [theme, setTheme] = useState<Theme>('light');

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, setTheme };
};
