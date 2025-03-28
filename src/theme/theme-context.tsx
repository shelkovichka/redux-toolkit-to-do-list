import {createContext} from 'react';

import {TAG_COLORS} from './constants';
import {ThemeContextType} from './types';

const initialState: ThemeContextType = {
  theme: 'system',
  setTheme: () => null,
  tagColors: TAG_COLORS,
};

export const ThemeContext = createContext<ThemeContextType>(initialState);
