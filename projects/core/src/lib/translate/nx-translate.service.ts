import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { NxTranslateConfig, NxTranslations } from './nx-translate.types';

export const NX_TRANSLATE_CONFIG = new InjectionToken<NxTranslateConfig>('NX_TRANSLATE_CONFIG');

@Injectable({ providedIn: 'root' })
export class NxTranslateService {
  private readonly translations = new Map<string, NxTranslations>();
  private readonly fallbackLang?: string;
  private readonly langSubject: BehaviorSubject<string>;

  readonly langChanges$: Observable<string>;

  constructor(@Optional() @Inject(NX_TRANSLATE_CONFIG) config: NxTranslateConfig | null) {
    if (config) {
      for (const [lang, dict] of Object.entries(config.translations)) {
        this.translations.set(lang, dict);
      }
      this.fallbackLang = config.fallbackLang;
    }
    this.langSubject = new BehaviorSubject<string>(config?.defaultLang ?? 'en');
    this.langChanges$ = this.langSubject.asObservable();
  }

  /** Currently active language code. */
  get currentLang(): string {
    return this.langSubject.value;
  }

  /** Language codes that have a registered dictionary. */
  get availableLangs(): string[] {
    return Array.from(this.translations.keys());
  }

  /** Registers (or replaces) the dictionary for a given language. */
  setTranslations(lang: string, dictionary: NxTranslations): void {
    this.translations.set(lang, dictionary);
  }

  /** Switches the active language, emitting to every `nxTranslate` pipe/subscriber. */
  use(lang: string): void {
    if (this.translations.has(lang)) {
      this.langSubject.next(lang);
    }
  }

  /** Synchronously resolves a dot-notation key, e.g. `"nav.home"`. */
  instant(key: string, params?: Record<string, string | number>): string {
    const text = this.resolve(this.currentLang, key) ?? this.resolve(this.fallbackLang, key) ?? key;
    return this.interpolate(text, params);
  }

  /** Observable form of `instant`, re-emitting whenever the active language changes. */
  get(key: string, params?: Record<string, string | number>): Observable<string> {
    return this.langChanges$.pipe(map(() => this.instant(key, params)));
  }

  private resolve(lang: string | undefined, key: string): string | undefined {
    if (!lang) return undefined;
    const dictionary = this.translations.get(lang);
    if (!dictionary) return undefined;

    const value = key
      .split('.')
      .reduce<NxTranslations | string | undefined>(
        (acc, segment) => (acc && typeof acc === 'object' ? acc[segment] : undefined),
        dictionary
      );

    return typeof value === 'string' ? value : undefined;
  }

  private interpolate(text: string, params?: Record<string, string | number>): string {
    if (!params) return text;
    return text.replace(/{{\s*(\w+)\s*}}/g, (_, name) => (params[name] !== undefined ? String(params[name]) : ''));
  }
}
