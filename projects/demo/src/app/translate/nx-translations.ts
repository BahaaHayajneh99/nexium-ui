import { NxTranslations } from '../../../../../dist/core';
import localeEn from './locales/locale-en.json';
import localeAr from './locales/locale-ar.json';

/** Sample dictionaries powering the "Translate" demo page. en/ar load from JSON so translators can edit them directly. */
export const NX_TRANSLATIONS: Record<string, NxTranslations> = {
  en: localeEn,
  ar: localeAr,
  es: {
    hello: '¡Hola!',
    welcome: '¡Bienvenido de nuevo, {{name}}!',
    home: 'Inicio',
    settings: 'Ajustes',
  },
  fr: {
    hello: 'Bonjour !',
    welcome: 'Content de te revoir, {{name}} !',
    home: 'Accueil',
    settings: 'Paramètres',
  },
};
