import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNxTranslate } from '../../../../dist/core';
import { provideNxLicense } from '../../../../dist/components';

import { routes } from './app.routes';
import { NX_TRANSLATIONS } from './translate/nx-translations';

// This docs/demo site goes through the exact same real, live license check as any paying
// customer's app - no kill switch, no shortcut. This token is a real entry from the license
// pool, claimed and marked paid via reserve-docs-site-token.js against the live Firebase
// project, so the check always resolves to unlocked - just asynchronously, like it would for
// anyone else, which can mean a brief flash of the locked placeholder on a page's first load
// each day (nxProLicenseGranted() caches a verified result in localStorage for 24h, so this
// only happens once per day per browser, not on every navigation).
//
// There used to be a separate NX_LICENSE_ENABLED kill switch here to skip that network round
// trip entirely. It's gone: it was a real, exported, public symbol - "undocumented" is not the
// same as "private" for a published package - and a consuming app found and used it in
// production to unlock every PRO component without ever providing a token. That's a direct hit
// to the whole PRO tier's monetization, so the fix was to remove the bypass outright rather than
// try to hide it better.
const DOCS_SITE_LICENSE_TOKEN = 'nxui_pro_00168b899b10a75fcf9480172e30a386';

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
