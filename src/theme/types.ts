export type Theme = 'dark' | 'light' | 'system';

export type TagType = 'personal' | 'work' | 'important' | 'idea' | 'study';

export interface TagColors {
  [key: string]: string;
  personal: string;
  work: string;
  important: string;
  idea: string;
  study: string;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  tagColors: TagColors;
}
