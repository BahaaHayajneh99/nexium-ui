/**
 * Shared validation building blocks used by `isRequired`/`pattern` inputs
 * across the form components (nx-input, nx-textarea, nx-select, ...).
 * Kept in one place so every component checks the same regexes and reports
 * the same default messages.
 */
export type NxValidationPattern = 'email' | 'url' | 'phone' | 'numeric' | 'alpha' | 'alphanumeric';

export const NX_VALIDATION_PATTERNS: Record<NxValidationPattern, RegExp> = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
  phone: /^\+?[0-9()\-\s]{7,20}$/,
  numeric: /^[0-9]+$/,
  alpha: /^[A-Za-z]+$/,
  alphanumeric: /^[A-Za-z0-9]+$/,
};

const NX_PATTERN_ERROR_MESSAGES: Record<NxValidationPattern, string> = {
  email: 'Enter a valid email address',
  url: 'Enter a valid URL',
  phone: 'Enter a valid phone number',
  numeric: 'Only numbers are allowed',
  alpha: 'Only letters are allowed',
  alphanumeric: 'Only letters and numbers are allowed',
};

/** Accepted by every component's `pattern` input: a named preset, a custom RegExp, or a custom regex source string. */
export type NxPatternInput = NxValidationPattern | RegExp | string | null | undefined;

function isNamedPattern(pattern: string): pattern is NxValidationPattern {
  return pattern in NX_VALIDATION_PATTERNS;
}

/** Resolves a `pattern` input into a RegExp to test against, or null if none was given. */
export function resolveNxPattern(pattern: NxPatternInput): RegExp | null {
  if (!pattern) {
    return null;
  }
  if (pattern instanceof RegExp) {
    return pattern;
  }
  if (isNamedPattern(pattern)) {
    return NX_VALIDATION_PATTERNS[pattern];
  }
  try {
    return new RegExp(pattern);
  } catch {
    return null;
  }
}

/** Default error message for a `pattern` input, used when `patternErrorMessage` isn't set. */
export function nxPatternErrorMessage(pattern: NxPatternInput): string {
  if (typeof pattern === 'string' && isNamedPattern(pattern)) {
    return NX_PATTERN_ERROR_MESSAGES[pattern];
  }
  return 'Invalid format';
}
