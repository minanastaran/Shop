import React, { useState, createContext, useContext } from 'react';
import { languageOptions, dictionaryList } from './langoptions';

// create the language context with default selected language
export const LanguageContext = createContext({
  userLanguage: 'fa',
  dictionary: dictionaryList.fa
});

// it provides the language context to app
export function LanguageProvider({ children }) {
  const defaultLanguage = window.localStorage.getItem('lang');
  const [userLanguage, setUserLanguage] = useState(defaultLanguage || 'fa');

  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: selected => {
      const newLanguage = languageOptions[selected] ? selected : 'fa'
      setUserLanguage(newLanguage);
      window.localStorage.setItem('lang', newLanguage);
    }
  };
  return (
    <LanguageContext.Provider value={provider} >
      {children}
    </LanguageContext.Provider>
  );
};

// get text according to id & current language
export function MessageLang({ id }) {
  const Translate = useContext(LanguageContext);
  return Translate.dictionary[id] || id;
};