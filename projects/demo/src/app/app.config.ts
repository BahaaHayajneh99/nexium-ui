import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNxTranslate } from '../../../../dist/core';
import { provideNxLicense } from '../../../../dist/components';

import { routes } from './app.routes';
import { NX_TRANSLATIONS } from './translate/nx-translations';

// This docs/demo site always shows PRO components working, the same as every
// other demo - the license check only bites in a consumer's own project
// after `npm install nexium-ui`, where no token is configured by default.
//
// This token is now a real entry from the license pool (Firestore-verified live, not a locally
// forged one) - run `node functions/scripts/reserve-docs-site-token.js` once against the deployed
// project and paste its output here. Until then this placeholder will correctly fail live
// verification and every PRO component on this site will show its locked placeholder.
const DOCS_SITE_LICENSE_TOKEN = 'TODO: paste the output of reserve-docs-site-token.js here';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNxLicense(DOCS_SITE_LICENSE_TOKEN),
    provideNxTranslate({
      defaultLang: 'en',
      fallbackLang: 'en',
      translations: NX_TRANSLATIONS,
    }),
  ],
};
