import {createContext} from 'react';

import {ThemeContextType} from './types';

export const TAG_COLORS = {
  personal: 'bg-violet-200',
  work: 'bg-amber-200',
  important: 'bg-red-200',
  idea: 'bg-emerald-200',
  study: 'bg-indigo-200',
};

const initialState: ThemeContextType = {
  theme: 'system',
  setTheme: () => null,
  tagColors: TAG_COLORS,
};

export const ThemeContext = createContext<ThemeContextType>(initialState);
