export type NxTranslations = { [key: string]: string | NxTranslations };

export interface NxTranslateConfig {
  /** Language activated immediately after the app bootstraps. */
  defaultLang: string;
  /** Language used when a key is missing from the active language. */
  fallbackLang?: string;
  /** Translation dictionaries keyed by language code. */
  translations: Record<string, NxTranslations>;
}
