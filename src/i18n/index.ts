import * as Localization from 'expo-localization';
import {createInstance} from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  en: {translation: en},
  es: {translation: es},
};

function getDeviceLanguage(): string {
  const languageCode = Localization.getLocales()[0]?.languageCode ?? 'en';
  return ['en', 'es'].includes(languageCode) ? languageCode : 'en';
}

const i18n = createInstance();

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: {escapeValue: false},
});

export default i18n;
