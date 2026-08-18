import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'nexium-theme';
const PRIMARY_COLOR_STORAGE_KEY = 'nexium-primary-color';
const DEFAULT_PRIMARY_COLOR = '#3498db';

export type NxTheme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<NxTheme>(this.readInitialTheme());
  readonly primaryColor = signal<string>(this.readInitialPrimaryColor());

  constructor() {
    this.applyTheme(this.theme());
    this.applyPrimaryColor(this.primaryColor());
  }

  toggle(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: NxTheme): void {
    this.theme.set(theme);
    this.applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  setPrimaryColor(hex: string): void {
    this.primaryColor.set(hex);
    this.applyPrimaryColor(hex);
    localStorage.setItem(PRIMARY_COLOR_STORAGE_KEY, hex);
  }

  resetPrimaryColor(): void {
    this.primaryColor.set(DEFAULT_PRIMARY_COLOR);
    document.documentElement.style.removeProperty('--shell-primary');
    localStorage.removeItem(PRIMARY_COLOR_STORAGE_KEY);
  }

  private applyTheme(theme: NxTheme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private applyPrimaryColor(hex: string): void {
    document.documentElement.style.setProperty('--shell-primary', hex);
  }

  private readInitialTheme(): NxTheme {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private readInitialPrimaryColor(): string {
    return localStorage.getItem(PRIMARY_COLOR_STORAGE_KEY) ?? DEFAULT_PRIMARY_COLOR;
  }
}
