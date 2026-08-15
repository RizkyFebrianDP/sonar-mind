import { en, Dictionary } from './en';
import { id } from './id';

export const dictionaries = {
  en,
  id,
} as const;

export type Locale = keyof typeof dictionaries;

export { en, id };
export type { Dictionary };
