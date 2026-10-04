import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNxTranslate } from '../../../../dist/core';
import { provideNxLicense } from '../../../../dist/components';

import { routes } from './app.routes';
import { NX_TRANSLATIONS } from './translate/nx-translations';
import { CommonService } from './services/common.service';

// This docs/demo site always shows PRO components working, the same as every
// other demo - the license check only bites in a consumer's own project
// after `npm install nexium-ui`, where no token is configured by default.
//
// This is a real entry from the license pool, claimed and marked paid via
// reserve-docs-site-token.js against the live Firebase project.
const DOCS_SITE_LICENSE_TOKEN = 'nxui_pro_00168b899b10a75fcf9480172e30a386';

// CommonService has no constructor dependencies, so it's safe to instantiate directly here
// (this array is built before Angular's DI container exists, so it can't be injected normally).
// `isEnablePro` is the single source of truth for whether this site does a real license check
// or shows every PRO component unlocked outright - see CommonService for the toggle.
const { isEnablePro } = new CommonService();

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNxLicense(DOCS_SITE_LICENSE_TOKEN, isEnablePro),
    provideNxTranslate({
      defaultLang: 'en',
      fallbackLang: 'en',
      translations: NX_TRANSLATIONS,
    }),
  ],
};
