import { Injectable } from "@angular/core";

export interface NxThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;

  secondary: string;
  secondaryDark: string;
  secondaryLight: string;

  success: string;
  successDark: string;

  danger: string;
  dangerDark: string;

  warning: string;
  warningDark: string;

  info: string;
  infoDark: string;

  white: string;
  black: string;

  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;

  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  textWhite: string;

  borderColor: string;
  borderHoverColor: string;
}

@Injectable({ providedIn: 'root' })
export class CommonService {
  /** Single source of truth for the package/brand name shown across the demo site. */
  readonly appName = 'NexiumUI';

//Theme Colors - reference the CSS custom properties defined in styles.scss
// (`:root { --primary-color: ...; }`), so TS stays in sync with the SCSS
// palette instead of duplicating raw hex values.
  readonly colors: NxThemeColors = {
    primary: 'var(--shell-primary)',
    primaryDark: 'var(--primary-color-dark)',
    primaryLight: 'var(--primary-color-light)',

    secondary: 'var(--secondary-color)',
    secondaryDark: 'var(--secondary-color-dark)',
    secondaryLight: 'var(--secondary-color-light)',

    success: 'var(--success-color)',
    successDark: 'var(--success-color-dark)',

    danger: 'var(--danger-color)',
    dangerDark: 'var(--danger-color-dark)',

    warning: 'var(--warning-color)',
    warningDark: 'var(--warning-color-dark)',

    info: 'var(--info-color)',
    infoDark: 'var(--info-color-dark)',

    white: 'var(--white-color)',
    black: 'var(--black-color)',

    gray50: 'var(--gray-50)',
    gray100: 'var(--gray-100)',
    gray200: 'var(--gray-200)',
    gray300: 'var(--gray-300)',
    gray400: 'var(--gray-400)',
    gray500: 'var(--gray-500)',
    gray600: 'var(--gray-600)',
    gray700: 'var(--gray-700)',
    gray800: 'var(--gray-800)',
    gray900: 'var(--gray-900)',

    textPrimary: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    textDisabled: 'var(--text-disabled)',
    textWhite: 'var(--text-white)',

    borderColor: 'var(--border-color)',
    borderHoverColor: 'var(--border-hover-color)',
  };

  /** The core brand/status colors, handy for iterating in demos. */
  readonly colorPalette: string[] = [
    this.colors.primary,
    this.colors.success,
    this.colors.danger,
    this.colors.warning,
    this.colors.info,
  ];
}
