import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NX_TRANSLATE_CONFIG } from './nx-translate.service';
import { NxTranslateConfig } from './nx-translate.types';

/** Registers the default language, fallback language, and dictionaries for `NxTranslateService`. */
export function provideNxTranslate(config: NxTranslateConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: NX_TRANSLATE_CONFIG, useValue: config }]);
}
