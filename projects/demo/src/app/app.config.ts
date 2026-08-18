import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNxTranslate } from '../../../../dist/core';

import { routes } from './app.routes';
import { NX_TRANSLATIONS } from './translate/nx-translations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNxTranslate({
      defaultLang: 'en',
      fallbackLang: 'en',
      translations: NX_TRANSLATIONS,
    }),
  ],
};
