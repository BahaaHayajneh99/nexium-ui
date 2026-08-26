# core

Shared, framework-level utilities for the NexiumUI ecosystem, published separately from
`nexium-ui` so apps that only need them (without the full component library) aren't forced to
pull it in. Currently ships one feature: a lightweight translation (i18n) service.

## Installation

While this workspace is in development, build the library locally and consume it through the
`core` TypeScript path mapping declared in the root `tsconfig.json`:

```bash
ng build core
```

Once published to npm, install it like any other package:

```bash
npm install core
```

## Translation (i18n)

A minimal, dependency-free translation layer - a config object, a service, and a pipe. No
external i18n library required.

### Configure

Register your dictionaries once, at bootstrap, with `provideNxTranslate`:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideNxTranslate } from 'core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNxTranslate({
      defaultLang: 'en',
      fallbackLang: 'en',
      translations: {
        en: {
          nav: { home: 'Home', settings: 'Settings' },
          greeting: 'Hello, {{name}}!',
        },
        ar: {
          nav: { home: 'الرئيسية', settings: 'الإعدادات' },
          greeting: 'أهلاً، {{name}}!',
        },
      },
    }),
    // ...your other providers
  ],
};
```

| `NxTranslateConfig` field | Type | Description |
| --- | --- | --- |
| `defaultLang` | `string` | Language activated immediately after the app bootstraps. |
| `fallbackLang` | `string` (optional) | Language used when a key is missing from the active language. |
| `translations` | `Record<string, NxTranslations>` | Nested dictionaries keyed by language code - dot-notation keys resolve through the nesting (e.g. `'nav.home'`). |

### Use in templates - `nxTranslate` pipe

```html
<h1>{{ 'nav.home' | nxTranslate }}</h1>
<p>{{ 'greeting' | nxTranslate:{ name: user.firstName } }}</p>
```

The pipe is impure, so it re-renders automatically whenever the active language changes - no
manual refresh needed.

### Use in code - `NxTranslateService`

```ts
import { Component, inject } from '@angular/core';
import { NxTranslateService } from 'core';

@Component({ /* ... */ })
export class LanguageSwitcher {
  private readonly translate = inject(NxTranslateService);

  switchToArabic(): void {
    this.translate.use('ar');
  }

  get homeLabel(): string {
    return this.translate.instant('nav.home');
  }
}
```

| Member | Type | Description |
| --- | --- | --- |
| `currentLang` | `string` | Currently active language code. |
| `availableLangs` | `string[]` | Language codes that have a registered dictionary. |
| `langChanges$` | `Observable<string>` | Emits the new language code every time `use()` switches it. |
| `use(lang)` | `(lang: string) => void` | Switches the active language. No-op if `lang` has no registered dictionary. |
| `setTranslations(lang, dict)` | `(lang: string, dict: NxTranslations) => void` | Registers or replaces a language's dictionary at runtime - handy for lazy-loaded translation files. |
| `instant(key, params?)` | `(key: string, params?: Record<string, string \| number>) => string` | Synchronously resolves a dot-notation key, falling back to `fallbackLang` and then to the key itself if nothing matches. `params` interpolates `{{ placeholders }}` in the resolved string. |
| `get(key, params?)` | `(key: string, params?: Record<string, string \| number>) => Observable<string>` | Observable form of `instant` - re-emits whenever the active language changes. |

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
