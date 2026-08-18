import { Component } from '@angular/core';
import { NxTranslatePipe, NxTranslateService } from '../../../../../dist/core';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-nx-translate-demo',
  imports: [NxTranslatePipe, DemoSection],
  templateUrl: './nx-translate-demo.html',
  styleUrl: './nx-translate-demo.scss',
})
export class NxTranslateDemo {
  constructor(readonly translateService: NxTranslateService) {}

  setupCode = `import { provideNxTranslate } from 'core';
import localeEn from './locales/locale-en.json';
import localeAr from './locales/locale-ar.json';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNxTranslate({
      defaultLang: 'en',
      fallbackLang: 'en',
      translations: { en: localeEn, ar: localeAr },
    }),
  ],
};`;

  newLocaleFileCode = `{
  "hello": "Bonjour !",
  "welcome": "Content de te revoir, {{name}} !",
  "home": "Accueil",
  "settings": "Paramètres"
}`;

  registerLocaleCode = `import localeFr from './locales/locale-fr.json';

provideNxTranslate({
  defaultLang: 'en',
  fallbackLang: 'en',
  translations: { en: localeEn, ar: localeAr, fr: localeFr },
});`;

  pipeCode = `<p>{{ 'hello' | nxTranslate }}</p>`;

  paramsCode = `<p>{{ 'welcome' | nxTranslate: { name: 'Sara' } }}</p>`;

  switchLangCode = `constructor(private translate: NxTranslateService) {}

setSpanish(): void {
  this.translate.use('es');
}`;

  serviceCode = `constructor(private translate: NxTranslateService) {
  const label = this.translate.instant('home');
  this.translate.get('settings').subscribe(text => console.log(text));
}`;

  setLang(lang: string): void {
    this.translateService.use(lang);
  }
}
