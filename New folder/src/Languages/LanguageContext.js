import { languageOptions, dictionaryList } from './langoptions';
import { createContext } from 'react';

// create the language context with default selected language
export const LanguageContext = createContext({
  userLanguage: 'fa',
  directions: 'rtl',
  dictionary: dictionaryList.fa
});
